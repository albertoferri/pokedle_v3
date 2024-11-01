<script>
import pokemonService from '../service/pokemonService';

export default {
  data() {
    return {
      randomPokemon: null,
      guess: '',
      blurAmount: 20, // Sfocatura iniziale maggiore
      message: '',
      attempts: 0,
      maxAttempts: 10, // Limite massimo di tentativi
      correctGuesses: 0,
      successMessage: false,
      errorMessage: false,
      errorClass: '',
      isLoading: false // Stato di caricamento
    };
  },
  async created() {
    await this.fetchRandomCard();
  },
  methods: {
    async fetchRandomCard() {
      this.isLoading = true; // Inizia il caricamento
      try {
        const randomPokemon = await pokemonService.getRandomCard();
        this.randomPokemon = randomPokemon;
        console.log(`Nome corretto: ${randomPokemon.name}`);
      } catch (error) {
        console.error('Error fetching random Pokémon card:', error);
      }
      this.isLoading = false; // Fine del caricamento
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
        this.correctGuesses += 1;
        this.attempts = 0; // Ripristina i tentativi
        this.nextPokemon();
      } else {
        this.message = '<i class="fa-solid fa-triangle-exclamation"></i><i class="fa-solid fa-triangle-exclamation"></i> Sbagliato! Riprova. <i class="fa-solid fa-triangle-exclamation"></i><i class="fa-solid fa-triangle-exclamation"></i>';
        this.successMessage = false;
        this.errorMessage = true;
        if (this.blurAmount > 1) {
          this.blurAmount -= 2; // Diminuire lentamente la sfocatura
        }
        this.errorClass = '';
        setTimeout(() => {
          this.errorClass = 'animate__animated animate__shakeX'; // Classe animazione errore
        }, 100); // Timeout breve per rimuovere e riaggiungere la classe
        if (this.attempts >= this.maxAttempts) {
          this.message = 'Hai raggiunto il numero massimo di tentativi. Hai perso!';
          this.errorMessage = true;
          this.successMessage = false;
          this.endGame();
        }
      }
    },
    nextPokemon() {
      setTimeout(async () => {
        this.blurAmount = 20; // Reimposta la sfocatura per il prossimo Pokémon
        this.message = '';
        this.guess = '';
        await this.fetchRandomCard();
      }, 2000); // Mostra il messaggio di successo per 2 secondi prima di passare al prossimo
    },
    reloadPage() {
      window.location.reload();
    },
    endGame() {
      setTimeout(() => {
        this.reloadPage();
      }, 3000); // Ricarica la pagina dopo 3 secondi
    }
  }
};
</script>




<template>
  <div v-if="randomPokemon" class="guess-card container">
    <div class="row">
      <div class="col-lg-8 col-12 col-img mb-5">
        <h2 class="text-whited">Indovina il nome della carta Pokémon</h2>
        <div v-if="isLoading" class="loading-spinner">
          <i class="fa-solid fa-circle-notch fa-spin"></i>
        </div>
        <img v-else :src="randomPokemon.images.large" :style="{ filter: `blur(${blurAmount}px)` }" :class="['blurred-image', errorClass]" />
      </div>
      <div class="col-lg-4 col-12 d-flex flex-column justify-content-center">
        <input v-model="guess" placeholder="Nome della carta" @keyup.enter="checkGuess" class="guess-input mt-5 mt-lg-0" :disabled="isLoading" />
        <button @click="checkGuess" :disabled="isLoading">Verifica</button>
        <p v-if="successMessage" class="success-message" v-html="message"></p>
        <p v-if="errorMessage" class="error-message" v-html="message"></p>
        <p class="text-white mt-3">Numero di tentativi: {{ attempts }} / {{ maxAttempts }}</p>
        <p class="text-white">Pokemon indovinati: {{ correctGuesses }}</p>
        <!-- <button class="btn btn-success" @click="reloadPage" :disabled="isLoading">Prova un altro Pokémon</button> -->
      </div>
    </div>
  </div>
  <div v-else>
    <p>Caricamento carta...</p>
  </div>
</template>


  
<style scoped lang="scss">
.guess-card {
  text-align: center;
  margin-top: 20px;
}
.blurred-image {
  max-width: 50%;
  height: auto;
}
button {
  padding: 8px 16px;
  background-color: yellow;
  border-radius: 5px;
  border: 1px solid yellow;
  color: black;
  font-weight: bold;
  margin: 0 8px;
  cursor: pointer;
}
button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
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
.loading-spinner {
  font-size: 48px; /* Dimensione dell'icona di caricamento */
  color: #3498db; /* Colore dell'icona di caricamento */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
