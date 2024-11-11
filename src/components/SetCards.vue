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
    <div v-if="loading" class="loading-container">
      <img src="https://assets.pokemon.com/static2/_ui/img/chrome/loaders/pokeball_gray.png" class="rotating-image" />
    </div>
    <div v-else class="cards-grid">
      <div 
        v-for="card in cards" 
        :key="card.id" 
        class="card-item" 
        @click="goToCardDetail(card.id)"
        data-aos="fade-up"
      >
        <h2 class="mb-3">{{ card.name }}</h2>
        <img :src="card.images.small" :alt="card.name" />
      </div>
    </div>

    <!-- Pagination Controls -->
    <div v-if="totalPages > 1" class="pagination-container d-flex gap-2 justify-content-center align-items-center py-4">
      <button class="btn btn-yellow" @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <button class="btn btn-yellow" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      <span class="d-flex justify-self-end">Page {{ currentPage }} of {{ totalPages }}</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  props: ['id', 'setName'],
  data() {
    return {
      cards: [],
      currentPage: 1,
      pageSize: 32,
      totalCards: 0,
      totalPages: 0,
      loading: true,  // Loading state
    };
  },
  async created() {
    console.log('Received set ID:', this.id);
    await this.fetchCards();
    AOS.init();  // Initialize AOS
  },
  methods: {
    async fetchCards() {
      if (!this.id) {
        console.error('setId non è stato impostato');
        return;
      }
      this.loading = true;  // Start loading
      try {
        const response = await axios.get(`https://api.pokemontcg.io/v2/cards`, {
          params: {
            q: `set.id:${this.id}`,
            pageSize: this.pageSize,
            page: this.currentPage,
          },
        });
        this.cards = response.data.data;
        this.totalCards = response.data.totalCount;
        this.totalPages = Math.ceil(this.totalCards / this.pageSize);
        AOS.refresh();  // Refresh AOS after fetching cards
      } catch (error) {
        console.error('Error loading cards:', error);
        console.log('Set ID:', this.id);
      } finally {
        this.loading = false;  // Stop loading
      }
    },
    goToCardDetail(id) {
      this.$router.push({ name: 'cardDetail', params: { id } });
    },
    async prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        await this.fetchCards();
        this.scrollToTop();
      }
    },
    async nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        await this.fetchCards();
        this.scrollToTop();
      }
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
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

  @media (max-width: 992px) {
    flex: 1 1 calc(50% - 16px);
  }

  @media (max-width: 576px) {
    flex: 1 1 100%;
  }
}

.card-item img {
  max-width: 100%;
  height: auto;
  transition: transform 0.3s ease;
  cursor: pointer;
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
