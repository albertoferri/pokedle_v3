<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-auto">
        <router-link to="/sets" class="btn btn-yellow">TORNA AI SET</router-link>
      </div>
    </div>
  </div>

  <div class="set-cards-container">
    <h1>Carte del Set: {{ setName }}</h1>
    <div v-if="cards && cards.length" class="cards-grid">
      <div v-for="card in cards" :key="card.id" class="card-item" @click="goToCardDetail(card.id)">
        <h2 class="mb-3">{{ card.name }}</h2>
        <img :src="card.images.small" :alt="card.name" />
      </div>
    </div>
    <div v-else class="loading-container">
      <img src="https://assets.pokemon.com/static2/_ui/img/chrome/loaders/pokeball_gray.png" class="rotating-image" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['id', 'setName'],
  data() {
    return {
      cards: [],
    };
  },
  async created() {
    console.log('Received set ID:', this.id);
    await this.fetchCards();
  },
  methods: {
    async fetchCards() {
      if (!this.id) {
        console.error('setId non è stato impostato');
        return;
      }
      try {
        const response = await axios.get(`https://api.pokemontcg.io/v2/cards?q=set.id:${this.id}`);
        this.cards = response.data.data;
      } catch (error) {
        console.error('Error loading cards:', error);
        console.log('Set ID:', this.id);
      }
    },
    goToCardDetail(id) {
      this.$router.push({ name: 'cardDetail', params: { id } });
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
  flex: 1 1 calc(25% - 16px);
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
