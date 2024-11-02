<template>
  <div class="container-fluid">
    <div class="search input-group w-50 offset-3 mb-5 pt-5">
      <input type="text" v-model="searchQuery" class="form-control bg-dark" placeholder="Cerca una carta" aria-label="Cerca una carta" aria-describedby="button-addon2">
      <button class="btn btn-outline-secondary" @click="searchPokemons" type="button" id="button-addon2">Cerca</button>
    </div>
    <h1 class="text-center">Elenco delle Carte Pokémon</h1>
    <div v-if="pokemons.length" class="pokemon-grid">
      <div v-for="pokemon in paginatedPokemons" :key="pokemon.id" class="pokemon-card" @click="goToCardDetail(pokemon.id)">
        <h2>{{ pokemon.name }}</h2>
        <img :src="pokemon.images.small" :alt="pokemon.name" />
      </div>
    </div>
    <div v-else>
      <p>Caricamento carte...</p>
    </div>
    <div class="pagination">
      <button @click="previousPage" :disabled="page === 1">Indietro</button>
      <button @click="nextPage">Avanti</button>
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
}


.form-control::placeholder {
  color: white;
  opacity: 1;
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

input {
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}
</style>
