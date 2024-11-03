<template>
  <div class="container-fluid">
    <div class="search input-group mb-5 pt-5">
      <input type="text" v-model="searchQuery" class="form-control bg-dark" placeholder="Cerca una carta" aria-label="Cerca una carta" aria-describedby="button-addon2">
      <button class="btn-yellow" @click="searchPokemons" type="button" id="button-addon2">Cerca</button>
    </div>
    <h1 class="text-center">Elenco delle Carte Pokémon</h1>
    <div v-if="pokemons.length" class="pokemon-grid">
      <div v-for="pokemon in paginatedPokemons" :key="pokemon.id" class="pokemon-card" @click="goToCardDetail(pokemon.id)">
        <h2>{{ pokemon.name }}</h2>
        <img :src="pokemon.images.small" :alt="pokemon.name" />
      </div>
    </div>
    <div v-else class="loading-container">
      <img src="https://assets.pokemon.com/static2/_ui/img/chrome/loaders/pokeball_gray.png" class="rotating-image" />
    </div>
    <div class="pagination pt-3 pb-5">
      <button class="btn-yellow" @click="previousPage" :disabled="page === 1">Indietro</button>
      <button class="btn-yellow" @click="nextPage">Avanti</button>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      pokemons: [],
      page: 1,
      pageSize: 50,
      searchQuery: '',
      cardsPerRow: 4,
    };
  },
  computed: {
    paginatedPokemons() {
      const startIndex = (this.page - 1) * this.pageSize;
      return this.pokemons.slice(startIndex, startIndex + this.pageSize);
    }
  },
  watch: {
    page: 'fetchPokemons'
  },
  async created() {
    this.fetchPokemons();
  },
  methods: {
    async fetchPokemons() {
      try {
        const response = await axios.get('https://api.pokemontcg.io/v2/cards', {
          params: { pageSize: this.pageSize, page: this.page }
        });
        this.pokemons = response.data.data;
      } catch (error) {
        console.error('Error loading Pokémon cards:', error);
      }
    },
    async searchPokemons() {
      try {
        const response = await axios.get('https://api.pokemontcg.io/v2/cards', {
          params: { q: `name:${this.searchQuery}`, pageSize: this.pageSize, page: this.page }
        });
        this.pokemons = response.data.data;
        this.page = 1; // Reset della paginazione dopo la ricerca
      } catch (error) {
        console.error(`Error searching Pokémon cards for name "${this.searchQuery}":`, error);
      }
    },
    nextPage() {
      if (this.page * this.pageSize < this.pokemons.length) {
        this.page += 1;
      }
    },
    previousPage() {
      if (this.page > 1) {
        this.page -= 1;
      }
    },
    goToCardDetail(id) {
      this.$router.push({ name: 'cardDetail', params: { id } });
    },
    goToGuessCard() {
      this.$router.push({ name: 'guessCard' });
    }
  }
};
</script>

<style scoped lang="scss">
.container-fluid {
  color: white;

  background: url('../assets/background-nobg.png') repeat 0 0;
    animation: animate-bg 20s infinite linear;

   
    @keyframes animate-bg {
        100% {
            background-position: 100px 100px;
        }
    }
}


.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 52vh;
  width: 100%;
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


.form-control::placeholder {
  color: white;
  opacity: 1;
}

.form-control:focus {
  border-color: yellow;
  box-shadow: 0 0 0 1px rgba(255, 255, 0, 0.388);
}

.pokemon-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.pokemon-card {
  padding: 16px;
  margin: 8px;
  flex: 0 0 calc(100% / 5 - 16px);
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;


  // Media query per tablet (dimensioni tipiche: 768px - 1024px)
  @media (max-width: 1440px) {
    flex: 0 0 calc(100% / 3 - 16px); // 3 colonne su tablet
  }

  // Media query per mobile (dimensioni tipiche: meno di 768px)
  @media (max-width: 911px) {
    flex: 0 0 calc(100% / 2 - 16px); // 2 colonne su mobile
  }

  // Media query per schermi molto piccoli (ad esempio, telefoni più piccoli)
  @media (max-width: 611px) {
    flex: 0 0 calc(100% - 16px); // 1 colonna su schermi molto piccoli
  }
}

.search{
  width: 50%;
  margin-left: 25%;

  @media (max-width: 911px) {
    width: 100%;
    margin-left: 0;
  }
}

.pokemon-card h2 {
  overflow: hidden;
  text-overflow: ellipsis;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}


input {
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}
</style>
