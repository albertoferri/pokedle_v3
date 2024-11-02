<template>
    <div class="container-fluid">
      <h1>Elenco delle Carte Pokémon</h1>
      <input v-model="searchQuery" placeholder="Cerca una carta per nome" />
      <button @click="searchPokemons">Cerca</button>
      <button class="bg-success border-success" @click="goToGuessCard">Indovina una Carta</button>
      <div v-if="pokemons.length" class="pokemon-grid">
        <div v-for="pokemon in pokemons" :key="pokemon.id" class="pokemon-card" @click="goToCardDetail(pokemon.id)">
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
  import pokemonService from '../service/pokemonService';
  
  export default {
    data() {
      return {
        pokemons: [],
        page: 1,
        searchQuery: '',
        cardsPerRow: 6
      };
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
          const response = await this.$pokemonApi.card.where({ pageSize: 30, page: this.page });
          this.pokemons = response.data;
        } catch (error) {
          console.error('Error loading Pokémon cards:', error);
        }
      },
      async searchPokemons() {
        try {
          const response = await pokemonService.searchCardsByName(this.searchQuery);
          this.pokemons = response;
          this.page = 1; // Reset della paginazione dopo la ricerca
        } catch (error) {
          console.error(`Error searching Pokémon cards for name "${this.searchQuery}":`, error);
        }
      },
      nextPage() {
        this.page += 1;
        this.fetchPokemons();
      },
      previousPage() {
        if (this.page > 1) {
          this.page -= 1;
          this.fetchPokemons();
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
  .pokemon-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .pokemon-card {
    padding: 16px;
    margin: 8px;
    flex: 0 0 calc(100% / var(--cards-per-row) - 16px);
    box-sizing: border-box;
    text-align: center;
    cursor: pointer;
    white-space: nowrap;
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
    margin-bottom: 16px;
    padding: 8px;
    width: 100%;
    box-sizing: border-box;
  }
  </style>
  