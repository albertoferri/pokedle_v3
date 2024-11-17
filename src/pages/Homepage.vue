<script>
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();

import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

export default {
  setup() {
    // Stato per controllare la vista corrente
    const isSwiperVisible = ref(false);

    // Computed property to check if the viewport width is less than or equal to 992px
    const isMobile = ref(window.innerWidth <= 992);

    // Update the isMobile reactive value based on window resize
    const handleResize = () => {
      isMobile.value = window.innerWidth <= 992;
    };

    // Funzione per alternare la vista
    const toggleView = () => {
      isSwiperVisible.value = !isSwiperVisible.value;
    };

    // Register resize event listener when the component is mounted
    onMounted(() => {
      window.addEventListener('resize', handleResize);
    });

    // Cleanup the event listener when the component is unmounted
    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize);
    });

    return {
      isSwiperVisible,
      toggleView,
      isMobile
    };
  }
};
</script>

<template>
  <!-- Button to toggle Swiper visibility in mobile view -->
  <section class="d-block d-lg-none">
    <div class="container-fluid">
      <div class="row justify-content-end">
        <div class="col-auto">
          <button @click="toggleView" class="btn btn-yellow my-5 btn-size-lg"><i class="fa-solid fa-hurricane fa-spin fa-xl"></i></button>
        </div>
      </div>
    </div>
  </section>

  <!-- Swiper section for mobile view -->
  <section v-if="isSwiperVisible" class="swiper-section d-flex d-lg-none justify-content-center py-5">
    <swiper-container class="mySwiper" effect="cards" keyboard="true" grab-cursor="true">
      <swiper-slide class="bg-warning"><router-link class="text-decoration-none text-light" to="/sets">SCOPRI I SET</router-link></swiper-slide>
      <swiper-slide class="bg-primary"><router-link class="text-decoration-none text-light" to="/guess">GUESS THE CARD</router-link></swiper-slide>
      <swiper-slide class="bg-danger"><router-link class="text-decoration-none text-light" to="/pokemon">CARTE</router-link></swiper-slide>
      <swiper-slide class="bg-secondary"><router-link class="text-decoration-none text-light">WIP <i class="fa-solid fa-gear"></i></router-link></swiper-slide>
      <swiper-slide class="bg-secondary"><router-link class="text-decoration-none text-light">WIP <i class="fa-solid fa-gear"></i></router-link></swiper-slide>
    </swiper-container>
  </section>

  <!-- Grid content, visible by default on larger viewports and hidden on mobile when Swiper is visible -->
  <div class="content" :class="{ 'd-none': isSwiperVisible && isMobile }">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="row">
            <router-link to="/sets" class="block hover col-12 col-sm-6 bg-light border border-1 border-dark p-4 text-decoration-none fs-1 fw-bold text-warning">SCOPRI I SET</router-link>
            <router-link to="/guess" class="block hover col-12 col-sm-6 bg-light border border-1 border-dark p-4 text-decoration-none fs-1 fw-bold text-primary">GUESS THE CARD</router-link>
          </div>
          <div class="row">
            <router-link to="/pokemon" class="block hover col-12 col-sm-4 col-lg-3 bg-light border border-1 border-dark p-4 text-decoration-none fs-1 fw-bold text-danger">CARTE</router-link to="/pokemon">
            <div class="block hover col-12 col-sm-4 col-lg-6 bg-light border border-1 border-dark p-4 fs-1 fw-bold">WIP <i class="fa-solid fa-gear"></i></div>
            <div class="block hover col-12 col-sm-4 col-lg-3 bg-light border border-1 border-dark p-4 fs-1 fw-bold">WIP <i class="fa-solid fa-gear"></i></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.fa-gear{
    animation: spinner 3s infinite linear;
    @keyframes spinner {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
section.swiper-section {

  max-width: 100%;
  height: calc(100vh - 116px - 140px - 60px);

  
  swiper-container {
    width: 240px;
    height: 320px;

    @media (max-width: 500px) {
      width: 200px;
      height: 280px;
    }

    @media (max-width: 380px) {
      width: 170px;
      height: 260px;
    }

    @media (max-width: 322px) {
      width: 140px;
      height: 220px;
    }
  }

  swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 18px;
    font-size: 22px;
    font-weight: bold;
  }

}

.content {

  @media (max-width: 992px){
    position: relative;
    top: -35px;
  }

  .block {
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

  .hover {
    border-radius: 0;
    transition: border-radius 0.3s;

    &:hover {
      cursor: pointer;
      border-radius: 30px;
    }
  }

  
}
</style>
