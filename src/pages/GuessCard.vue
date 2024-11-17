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
      successClass: '',
      isLoading: false,
      showPopup: false,
      progress: 0, // Aggiunto per la barra di progresso
      attemptsLeftMessage: '', // Messaggio per i tentativi rimanenti
      selectedType: '',
    };
  },
  created() {
    this.fetchRandomCard();
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

      if (this.guess.toLowerCase() === this.randomPokemon.name.toLowerCase()) {
        this.message = 'Bravo! Hai indovinato! <i class="fa-solid fa-rocket"></i><i class="fa-solid fa-rocket"></i>';
        this.blurAmount = 0;
        this.successMessage = true;
        this.errorMessage = false;
        this.errorClass = '';
        this.successClass = 'animate__animated animate__tada';
        this.correctGuesses += 1;
        this.updateStats(true);
        this.attempts = 0;
        this.progress = 0; // Resetta la barra di progresso
        this.attemptsLeftMessage = ''; // Resetta il messaggio dei tentativi rimanenti
        this.nextPokemon();
      } else {
        this.message = '<i class="fa-solid fa-triangle-exclamation"></i> <i class="fa-solid fa-triangle-exclamation"></i> Sbagliato! <i class="fa-solid fa-triangle-exclamation"></i> <i class="fa-solid fa-triangle-exclamation"></i>';
        this.successMessage = false;
        this.errorMessage = true;
        if (this.blurAmount > 1) {
          this.blurAmount -= 2;
        }
        this.errorClass = '';
        this.successClass = '';
        setTimeout(() => {
          this.errorClass = 'animate__animated animate__shakeX';
        }, 100);

        // Incrementa il conteggio dei tentativi e aggiorna la barra di progresso
        this.attempts += 1;
        this.progress = (this.attempts / this.maxAttempts) * 100;

        // Aggiorna il messaggio dei tentativi rimanenti
        const attemptsLeft = this.maxAttempts - this.attempts;
        if (attemptsLeft <= 3) {
          this.attemptsLeftMessage = attemptsLeft === 1 ? 
            'Attenzione! Hai solo 1 tentativo rimanente.' : 
            `Attenzione! Hai solo ${attemptsLeft} tentativi rimanenti.`;
        } else {
          this.attemptsLeftMessage = '';
        }

        if (this.attempts >= this.maxAttempts) {
          this.message = 'Hai raggiunto il numero massimo di tentativi. Hai perso!';
          this.errorMessage = true;
          this.successMessage = false;
          this.updateStats(false);
          this.showPopup = true;
        }
      }
    },
    nextPokemon() {
      setTimeout(async () => {
        this.blurAmount = 20;
        this.message = '';
        this.guess = '';
        this.successClass = '';
        await this.fetchRandomCard();
      }, 2000);
    },
    reloadPage() {
      window.location.reload();
    },
    goToStatistics() {
      window.location.href = '/statistics';
    },
    updateStats(won) {
      const storedStats = JSON.parse(localStorage.getItem('gameStats')) || { gamesPlayed: 0, gamesWon: 0 };
      storedStats.gamesPlayed++;
      if (won) {
        storedStats.gamesWon++;
      }
      localStorage.setItem('gameStats', JSON.stringify(storedStats));
    },
    getProgressColor(progress) {
      if (progress < 33) {
        return 'green';
      } else if (progress < 66) {
        return 'yellow';
      } else {
        return 'red';
      }
    }
  },
};
</script>



<template>
  <div v-if="randomPokemon" class="guess-card container">
    <div class="row">
      <!-- <div class="col-12">
        <select v-model="selectedType">
          <option value="">Tutte le carte</option>
          <option value="V">V</option>
          <option value="Mega">Mega</option>
          <option value="VMAX">VMAX</option>
        </select>
      </div> -->
      <div class="col-lg-8 col-12 col-img mb-5">
        <h2 class="text-white mb-5">Indovina il nome della carta Pokémon!!!</h2>
        <div v-if="isLoading" class="loading-spinner">
          <img src="https://assets.pokemon.com/static2/_ui/img/chrome/loaders/pokeball_gray.png" class="rotating-image" />
        </div>
        <img v-else :src="randomPokemon.images.large" :style="{ filter: `blur(${blurAmount}px)` }" :class="['blurred-image mt-4', errorClass, successClass]" />
      </div>
      <div class="col-lg-4 col-12 d-flex flex-column justify-content-center">
        <input v-model="guess" @keyup.enter="checkGuess" placeholder="Nome della carta" class="guess-input mt-5 mt-lg-0" :disabled="isLoading" />
        <button class="btn-blue" @click="checkGuess" :disabled="isLoading">Verifica</button>

        <div class="message-container mt-3 fs-5">
          <p v-if="successMessage" class="success-message" v-html="message"></p>
          <p v-if="errorMessage" class="error-message" v-html="message"></p>
        </div>
        
        <!-- Barra di progresso -->
        <div class="progress-bar-container mt-3">
          <div class="progress-bar" :style="{ width: `${progress}%`, backgroundColor: getProgressColor(progress) }"></div>
        </div>

        <!-- Messaggio dei tentativi rimanenti -->
        <p v-if="attemptsLeftMessage" class="attempts-left-message text-warning mt-2">{{ attemptsLeftMessage }}</p>

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
  width: 75px;
  height: 75px;
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
  border-radius: 8px;
  text-align: center;
}

.progress-bar-container {
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  height: 20px;
}

.progress-bar {
  height: 100%;
  transition: width 0.5s ease-in-out;
}


.attempts-left-message {
  font-size: 1.1em;
  font-weight: bold;
}

.text-warning {
  color: #ff9800;
}
</style>
