<script>
import { RouterLink } from 'vue-router';
import pokemonService from '../service/pokemonService';
import hoverSoundFile from '../assets/click-hover.mp3';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  data() {
    return {
      sets: [],
      currentPage: 1,
      itemsPerPage: 30,
      hoverSound: null,
      isSoundEnabled: false,
      paginatedSets: [
        // Dati di esempio
        { id: 'base1', name: 'Base Set' },
        { id: 'base2', name: 'Jungle' },
      ]
    };
  },
  computed: {
    paginatedSets() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.sets.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.sets.length / this.itemsPerPage);
    }
  },
  async created() {
    this.fetchSets();
    this.hoverSound = new Audio(hoverSoundFile);
    this.hoverSound.volume = 0.2;
    AOS.init();
  },
  methods: {
    async fetchSets() {
      try {
        const setsData = await pokemonService.getAllSets();
        this.sets = setsData;
      } catch (error) {
        console.error('Error loading Pokémon sets:', error);
      }
    },
    changePage(page) {
      this.currentPage = page;
    },
    playHoverSound() {
      if (this.isSoundEnabled && this.hoverSound) {
        this.hoverSound.currentTime = 0;
        this.hoverSound.play().catch((error) => {
          console.error('Error playing sound:', error);
        });
      }
    },
    logSetId(setId) {
      console.log('Clicked set ID:', setId);  // Log the set ID to the console
    }
  },
};
</script>

<template>
  <div class="sets-container">
    <div class="toggle-wrapper d-flex justify-content-end align-items-center me-5">
      <label class="toggle-label fs-4 fw-bold me-2">SUONI </label>
      <input class="toggle-checkbox h-100" type="checkbox" v-model="isSoundEnabled">
      <div class="toggle-container">  
        <div class="toggle-button">
          <div class="toggle-button-circles-container">
            <!-- Circle elements omitted for brevity -->
          </div>
        </div>
      </div>
    </div>
    <div class="title-div d-flex justify-content-between align-items-center flex-column flex-md-row  mb-5">
      <h1 class="ms-0 ms-lg-5 display-2 fw-bold">Elenco dei Set Pokémon</h1>
      <div class="pagination-container me-0 me-md-5" v-if="totalPages > 1">
        <button v-for="page in totalPages" :key="page" @click="changePage(page)" :class="{'active': currentPage === page}">
          {{ page }}
        </button>
      </div>
    </div>
    <div v-if="sets && sets.length" class="sets-grid px-5">
      <RouterLink 
        v-for="set in paginatedSets" 
        :key="set.id" 
        :to="`/set/${set.id}`" 
        class="set-card text-decoration-none text-white d-flex flex-column align-items-center gap-2"
        @mouseenter="playHoverSound"
        @click="logSetId(set.id)"  
      >
        <img class="set-img" :src="set.images.logo" :alt="set.name" />
        <h2>{{ set.name }}</h2>
        <p class="m-0">Serie: {{ set.series }}</p>
      </RouterLink>
    </div>
    <div v-else class="loading-container">
      <img src="https://assets.pokemon.com/static2/_ui/img/chrome/loaders/pokeball_gray.png" class="rotating-image" />
    </div>
    <div class="pagination-container-bottom mt-4 pb-4" v-if="totalPages > 1">
      <button v-for="page in totalPages" :key="page" @click="changePage(page)" :class="{'active': currentPage === page}">
        {{ page }}
      </button>
    </div>
  </div>
</template>



<style scoped lang="scss">
@import 'aos/dist/aos.css'; 


.sets-container {
  color: white;
  text-align: center;
  padding-top: 20px;
  
}

.toggle-wrapper {
  position: relative;
  border-radius: .5em;
  padding: .125em;
}

.toggle-checkbox {
  -webkit-appearance: none;
  appearance: none;
  position: absolute;
  z-index: 1;
  width: 150px;
  opacity: 0;
  cursor: pointer;
}

.toggle-container {
  display: flex;
  align-items: center;
  position: relative;
  border-radius: .375em;
  width: 3em;
  height: 1.5em;
  box-shadow: 
    inset 0 0 .0625em .125em rgb(255 255 255 / .2),
    inset 0 .0625em .125em rgb(0 0 0 / .4);
  transition: background-color .4s linear;
}

.toggle-checkbox:checked + .toggle-container {
  background-color: #f3b519;
}

.toggle-button {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: .0625em;
  border-radius: .3125em;
  width: 1.375em;
  height: 1.375em;
  background-color: #e4ddcf;
  box-shadow:
    inset 0 -.0625em .0625em .125em rgb(0 0 0 / .1),
    inset 0 -.125em .0625em rgb(0 0 0 / .2),
    inset 0 .1875em .0625em rgb(255 255 255 / .3),
    0 .125em .125em rgb(0 0 0 / .5);
  transition: left .4s;
}

.toggle-checkbox:checked + .toggle-container > .toggle-button {
  left: 1.5625em;
}

.toggle-button-circles-container {
  display: grid;
  grid-template-columns: repeat(3, min-content);
  gap: .125em;
  position: absolute;
  margin: 0 auto;
}

.toggle-button-circle {
  border-radius: 50%;
  width: .125em;
  height: .125em;
  background-image: radial-gradient(circle at 50% 0, #f6f0e9, #bebcb0);
}

.sets-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

}

.set-card {
  flex: 1 1 calc(33.333% - 16px);
  box-sizing: border-box;
  padding: 16px;
  background-color: #2b3136;
  border-radius: 8px;
  text-align: center;
  transition: transform 0.2s ease, background-color 0.2s ease;
  transform: perspective(1000px) translateZ(0);
  z-index: 1;

  @media (max-width: 992px) {
    flex: 1 1 calc(50% - 16px);
  }

  @media (max-width: 576px) {
    flex: 1 1 100%;
  }

  &:hover {
    z-index: 99;
    background-color: #ffcd00;
    transform: perspective(1000px) translateZ(70px);
  }
}

.set-img {
  max-width: 100%;
  max-height: 200px;
  margin-top: auto;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 52vh;
  width: 100%;
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

.pagination-container-bottom{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  button {
    margin: 5px 5px;
    padding: 5px 10px;
    background-color: #2b3136;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    &.active {
      background-color: #f39c12;
    }
    &:hover {
      background-color: #f39c12;
    }
  }
}

.pagination-container {
  display: flex;
  justify-content: end;
  flex-wrap: wrap;

  button {
    width: calc(80% / 3 - 10px);
    margin: 5px 5px;
    padding: 5px 10px;
    background-color: #2b3136;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    &.active {
      background-color: #f39c12;
    }
    &:hover {
      background-color: #f39c12;
    }
  }
}
</style>
