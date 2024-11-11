<script>
import pokemonService from '../service/pokemonService';

export default {
  data() {
    return {
      card: null,
      zoomed: false,
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
      <div class="card-content row">
        <div class="col-12 col-md-7 d-flex justify-content-center flex-column">
          <div class="card-header d-flex flex-column align-items-center">
              <h1 class="text-start">{{ card.name }}</h1>
              <img :src="card.images.large" @click="zoomCard" class="card-image img fluid" />
          </div>
        </div>
        <div class="card-info col-12 col-md-5 d-none d-lg-block">
          <p class="fw-bold">HP: <span class="fw-normal">{{ card.hp }}</span></p>
          <p class="fw-bold">Type: <span class="fw-normal">{{ card.types.join(', ') }}</span></p>
          <p class="fw-bold">Level: <span class="fw-normal">{{ card.level }}</span></p>
          <p class="fw-bold">Rarity: <span class="fw-normal">{{ card.rarity }}</span></p>
          <p class="fw-bold">Artist: <span class="fw-normal">{{ card.artist }}</span></p>
          <p class="fw-bold">Evolves From: <span class="fw-normal">{{ card.evolvesFrom }}</span></p>
          <p class="fw-bold">Flavor Text: <span class="fw-normal">{{ card.flavorText }}</span></p>
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


  .card-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .card-image {
    object-fit: contain;
    cursor: pointer;
    max-height: 700px;

  }
  .card-info {
    font-size: 18px;
    text-align: start;
    background-color: rgb(128, 123, 123);
    padding: 20px;
    border-radius: 20px;
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
}
</style>
