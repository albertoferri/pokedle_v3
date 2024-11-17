<script>
import pokemonService from '../service/pokemonService';

export default {
  data() {
    return {
      card: null,
      zoomed: false,
      typeStyles: {
        Grass: { color: '#78C850', icon: 'fas fa-leaf' },
        Fire: { color: '#F08030', icon: 'fas fa-fire' },
        Water: { color: '#6890F0', icon: 'fas fa-tint' },
        Electric: { color: '#F8D030', icon: 'fas fa-bolt' },
        Psychic: { color: '#F85888', icon: 'fas fa-brain' },
        Ice: { color: '#98D8D8', icon: 'fas fa-snowflake' },
        Dragon: { color: '#7038F8', icon: 'fas fa-dragon' },
        Dark: { color: '#705848', icon: 'fas fa-moon' },
        Fairy: { color: '#EE99AC', icon: 'fas fa-magic' },
        Normal: { color: '#A8A878', icon: 'fas fa-circle' },
        Fighting: { color: '#C03028', icon: 'fas fa-fist-raised' },
        Flying: { color: '#A890F0', icon: 'fas fa-feather' },
        Poison: { color: '#A040A0', icon: 'fas fa-skull-crossbones' },
        Ground: { color: '#E0C068', icon: 'fas fa-mountain' },
        Rock: { color: '#B8A038', icon: 'fas fa-gem' },
        Bug: { color: '#A8B820', icon: 'fas fa-bug' },
        Ghost: { color: '#705898', icon: 'fas fa-ghost' },
        Steel: { color: '#B8B8D0', icon: 'fas fa-cog' }
      }
    };
  },
  async created() {
    const cardId = this.$route.params.id;
    console.log(`Fetching card with ID: ${cardId}`);
    try {
      const response = await pokemonService.getCardById(cardId);
      console.log('API response:', response);
      this.card = response;
    } catch (error) {
      console.error(`Error fetching card with ID ${cardId}:`, error);
    }
  },
  methods: {
    zoomCard() {
      this.zoomed = true;
    },
    closeZoom() {
      this.zoomed = false;
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};

</script>



<template>
  <div v-if="card" class="card-detail">
    <button class="back-button fw-bold" @click="goBack">Torna Indietro</button>
    <div class="card-content row d-flex align-items-center justify-content-center justify-content-lg-between">
      <div class="col-12 col-md-7 d-flex justify-content-center flex-column">
        <div class="card-header d-flex flex-column align-items-center">
          <h1 class="text-start">{{ card.name }}</h1>
          <img :src="card.images.large" @click="zoomCard" class="card-image img-fluid" />
        </div>
      </div>
      <div class="card-info col-12 col-md-5 d-none d-lg-block">
        <p v-if="card.hp" class="fw-bold text-warning">HP: <span class="fw-normal text-light">{{ card.hp }} PS</span></p>
        <p v-if="card.types && card.types.length" class="fw-bold text-warning">Type:
          <span v-for="type in card.types" :key="type" :style="{ backgroundColor: typeStyles[type]?.color }" class="pokemon-type">
            <i :class="typeStyles[type]?.icon" class="me-2"></i>{{ type }}
          </span>
        </p>
        <p v-if="card.rarity" class="fw-bold text-warning">Rarity: <span class="fw-normal text-light">{{ card.rarity }}</span></p>
        <p v-if="card.artist" class="fw-bold text-warning">Artist: <span class="fw-normal text-light">{{ card.artist }}</span></p>
        <p v-if="card.evolvesFrom" class="fw-bold text-warning">Evolves From: <span class="fw-normal text-light">{{ card.evolvesFrom }}</span></p>
        <p v-if="card.flavorText" class="fw-bold text-warning">Flavor Text: <span class="fw-normal text-light">{{ card.flavorText }}</span></p>
      </div>
    </div>
    <div v-if="zoomed" class="zoomed-card" @click="closeZoom">
      <img :src="card.images.large" class="zoomed-image" />
    </div>
  </div>
  <div v-else>
    <p>Caricamento carta...</p>
  </div>
</template>

  
  
  
<style lang="scss" scoped>
.card-detail {
  padding: 20px;
  max-height: 100vh;
  color: white;

  @media (max-width: 992px) {
    max-height: calc(100vh - 60px - 116px);
  }

  .card-content {
    .card-header {
      height: calc(100vh - 60px - 116px);
    }
  }
  .card-image {
    object-fit: contain;
    cursor: pointer;
    max-height: 520px;
  }
  .card-info {
    font-size: 18px;
    text-align: start;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 20px;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  }
  .zoomed-card {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .zoomed-image {
    max-width: 90%;
    max-height: 90%;
  }
  .back-button {
    background-color: yellow;
    border: none;
    color: black;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 10px 2px;
    cursor: pointer;
    border-radius: 5px;
  }
  .pokemon-type {
    display: inline-flex;
    align-items: center;
    padding: 0.2em 0.5em;
    border-radius: 5px;
    margin-right: 5px;
    color: #fff;
    font-weight: bold;
  }
}
</style>

