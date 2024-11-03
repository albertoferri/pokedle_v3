<script>
import pokemonService from '../service/pokemonService';

export default {
  data() {
    return {
      randomPokemon: null,
      guess: '',
      blurAmount: 20,
      message: '',
      attempts: 0,
      maxAttempts: 10,
      correctGuesses: 0,
      successMessage: false,
      errorMessage: false,
      errorClass: '',
      successClass: '', // Aggiunto per gestire la classe animate__tada
      isLoading: false,
      showPopup: false,
    };
  },
  async created() {
    await this.fetchRandomCard();
  },
  methods: {
    async fetchRandomCard() {
      this.isLoading = true;
      try {
        const randomPokemon = await pokemonService.getRandomCard();
        this.randomPokemon = randomPokemon;
        console.log(`Nome corretto: ${randomPokemon.name}`);
      } catch (error) {
        console.error('Error fetching random Pokémon card:', error);
      }
      this.isLoading = false;
    },
    checkGuess() {
      if (this.isLoading) return;

      this.attempts += 1;
      if (this.guess.toLowerCase() === this.randomPokemon.name.toLowerCase()) {
        this.message = 'Bravo! Hai indovinato! <i class="fa-solid fa-rocket"></i><i class="fa-solid fa-rocket"></i>';
        this.blurAmount = 0;
        this.successMessage = true;
        this.errorMessage = false;
        this.errorClass = '';
        this.successClass = 'animate__animated animate__tada'; // Aggiunge la classe animate__tada
        this.correctGuesses += 1;
        this.updateStats(true); // Aggiorna le statistiche
        this.attempts = 0; // Ripristina i tentativi
        this.nextPokemon();
      } else {
        this.message = '<i class="fa-solid fa-triangle-exclamation"></i> <i class="fa-solid fa-triangle-exclamation"></i> Sbagliato! <i class="fa-solid fa-triangle-exclamation"></i> <i class="fa-solid fa-triangle-exclamation"></i>';
        this.successMessage = false;
        this.errorMessage = true;
        if (this.blurAmount > 1) {
          this.blurAmount -= 2; // Diminuire lentamente la sfocatura
        }
        this.errorClass = '';
        this.successClass = ''; // Resetta la classe animate__tada
        setTimeout(() => {
          this.errorClass = 'animate__animated animate__shakeX'; // Classe animazione errore
        }, 100); // Timeout breve per rimuovere e riaggiungere la classe
        if (this.attempts >= this.maxAttempts) {
          this.message = 'Hai raggiunto il numero massimo di tentativi. Hai perso!';
          this.errorMessage = true;
          this.successMessage = false;
          this.updateStats(false); // Aggiorna le statistiche
          this.showPopup = true; // Mostra il popup di sconfitta
        }
      }
    },
    nextPokemon() {
      setTimeout(async () => {
        this.blurAmount = 20; // Reimposta la sfocatura per il prossimo Pokémon
        this.message = '';
        this.guess = '';
        this.successClass = ''; // Resetta la classe animate__tada
        await this.fetchRandomCard();
      }, 2000); // Mostra il messaggio di successo per 2 secondi prima di passare al prossimo
    },
    reloadPage() {
      window.location.reload();
    },
    goToStatistics() {
      window.location.href = '/statistics'; // Sostituisci '/statistics' con il percorso della tua pagina delle statistiche
    },
    updateStats(won) {
      const storedStats = JSON.parse(localStorage.getItem('gameStats')) || { gamesPlayed: 0, gamesWon: 0 };
      storedStats.gamesPlayed++;
      if (won) {
        storedStats.gamesWon++;
      }
      localStorage.setItem('gameStats', JSON.stringify(storedStats));
    },
  },
};
</script>



<template>
  <div v-if="randomPokemon" class="guess-card container">
    <div class="row">
      <div class="col-lg-8 col-12 col-img mb-5">
        <h2 class="text-white mb-5">Indovina il nome della carta Pokémon!!!</h2>
        <div v-if="isLoading" class="loading-spinner">
          <img src="https://assets.pokemon.com/static2/_ui/img/chrome/loaders/pokeball_gray.png" class="rotating-image" />
        </div>
        <img v-else :src="randomPokemon.images.large" :style="{ filter: `blur(${blurAmount}px)` }" :class="['blurred-image mt-4', errorClass, successClass]" />
      </div>
      <div class="col-lg-4 col-12 d-flex flex-column justify-content-center">
        <input v-model="guess" placeholder="Nome della carta" @keyup.enter="checkGuess" class="guess-input mt-5 mt-lg-0" :disabled="isLoading" />
        <button class="btn-blue" @click="checkGuess" :disabled="isLoading">Verifica</button>

        <div class="message-container mt-3 fs-5">
          <p v-if="successMessage" class="success-message" v-html="message"></p>
          <p v-if="errorMessage" class="error-message" v-html="message"></p>
        </div>
        
        <p class="text-white mt-3">Numero di tentativi: {{ attempts }} / {{ maxAttempts }}</p>
        <p class="text-white">Pokémon indovinati: {{ correctGuesses }}</p>
        <div v-if="showPopup" class="popup">
          <div class="popup-content bg-dark">
            <h3 class="text-white mb-3">Hai perso!</h3>
            <button class="btn-yellow text-white" @click="reloadPage">Riprova</button>
            <button class="btn-blue text-white disabled" disabled @click="goToStatistics">Visualizza statistiche</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="loading-container">
    <img src="https://assets.pokemon.com/static2/_ui/img/chrome/loaders/pokeball_gray.png" class="rotating-image" />
  </div>
</template>






<style scoped lang="scss">
.guess-card {
  text-align: center;
  padding-top: 20px;
}
.blurred-image {
  max-width: 50%;
  height: auto;
}


input.guess-input {
  margin-bottom: 16px;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}
.success-message {
  color: green;
  font-weight: bold;
}
.error-message {
  color: red;
  font-weight: bold;
}
.col-img img {
  box-shadow: none;
}
.errorMessage img {
  box-shadow: 0 0 10px red;
}
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 52vh;
  width: 50%;
}
.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
}
.rotating-image {
  width: 75px; /* Aumentato a 75px */
  height: 75px; /* Aumentato a 75px */
  animation: rotate 2s linear infinite;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.popup-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}
</style>
