<template>
    <div class="set-cards-container">
      <h1>Carte del Set: {{ setName }}</h1> <!-- Mostra il nome del set -->
      <div v-if="cards && cards.length" class="cards-grid">
        <div v-for="card in cards" :key="card.id" class="card-item">
          <h2>{{ card.name }}</h2>
          <img :src="card.images.small" :alt="card.name" />
        </div>
      </div>
      <div v-else class="loading-container">
        <img src="https://assets.pokemon.com/static2/_ui/img/chrome/loaders/pokeball_gray.png" class="rotating-image" />
      </div>
    </div>
  </template>
  
  
  <script>
  import axios from 'axios'; // Importa axios
  
  export default {
    props: ['setId', 'setName'], // Prop per ottenere l'ID del set e il nome del set dalla pagina precedente
    data() {
      return {
        cards: [], // Array per memorizzare le carte del set
      };
    },
    async created() {
      await this.fetchCards(); // Chiama fetchCards quando il componente viene creato
    },
    methods: {
      // Funzione per ottenere le carte di un set specifico
      async fetchCards() {
        try {
          const response = await axios.get(`https://api.pokemontcg.io/v2/cards?q=set.id:${this.setId}`);
          this.cards = response.data.data; // Memorizza i dati delle carte nel data
        } catch (error) {
          console.error('Error loading cards:', error);
        }
      },
    },
  };
  </script>
  
  
  <style scoped lang="scss">
  .set-cards-container {
    color: white;
    text-align: center;
    padding-top: 20px;
  }
  
  .cards-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  
  .card-item {
    padding: 16px;
    margin: 8px;
    flex: 1 1 calc(25% - 16px); /* 4 carte per riga */
    box-sizing: border-box;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: transform 0.3s ease, background-color 0.3s ease;
  }
  
  .card-item img {
    max-width: 100%;
    height: auto;
    transition: transform 0.3s ease;
  }
  
  .card-item:hover img {
    transform: scale(1.1);
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
  </style>
  
  