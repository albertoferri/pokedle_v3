<script>
export default {
  name: 'AppNav'
};
</script>

<template>
  <nav class="navbar navbar-expand-lg ">
    <div class="container-fluid">
      <router-link class="navbar-brand d-flex align-items-center ms-3" to="/">
        <img class="img-fluid h-90" src="../assets/poke-logo-new.png" alt="logo nav">
      </router-link>

      <!-- Custom Toggle Icon -->
      <div class="nav custom-toggler d-flex d-lg-none">
        <input type="checkbox" id="navbarToggler" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" />
        <svg>
          <use xlink:href="#menu" />
          <use xlink:href="#menu" />
        </svg>
      </div>

      <!-- SVG -->
      <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
        <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 56" id="menu">
          <path d="M48.33,45.6H18a14.17,14.17,0,0,1,0-28.34H78.86a17.37,17.37,0,0,1,0,34.74H42.33l-21-21.26L47.75,4"/>
        </symbol>
      </svg>

      <div class="collapse navbar-collapse w-100" id="navbarSupportedContent">
        <ul class="navbar-nav mb-2 mb-lg-0 row d-flex flex-row justify-content-evenly justify-content-lg-center w-100">
          <router-link to="/sets" class="nav-item col-12 col-md-4 col-lg-auto py-0 d-flex flex-column justify-content-center align-items-center nav-link my-2">
            <h3 class="active fs-5 mx-0 fw-bold text-warning mb-0" aria-current="page">SCOPRI I SET</h3>
            <img src="../assets/master-nobg.png" alt="Your Image" class="mx-3 d-lg-none" style="width: 50px; height: auto;">
          </router-link>
          <router-link to="/guess" class="nav-item col-12 col-md-4 col-lg-auto py-0 d-flex flex-column justify-content-center align-items-center nav-link m-2">
            <h3 class="active fs-5 mx-0 fw-bold text-primary mb-0" aria-current="page">GUESS THE CARD</h3>
            <img src="../assets/egg_pokemon.svg" alt="Your Image" class="mx-3 d-lg-none" style="width: 50px; height: auto;">
          </router-link>
          <router-link to="/pokemon" class="nav-item col-12 col-md-4 col-lg-auto py-0 d-flex flex-column justify-content-center align-items-center nav-link my-2">
            <h3 class="active fs-5 mx-0 fw-bold text-danger mb-0" aria-current="page">CARTE</h3>
            <img src="../assets/pikachu.png" alt="Your Image" class="mx-3 d-lg-none" style="width: 50px; height: auto;">
          </router-link>
        </ul>
      </div>
    </div>
  </nav>
</template>


<style lang="scss">
nav {

  background-color: #171a1d;
  .navbar-brand {
    height: 100px;
  }

  h3{
    white-space: nowrap;
  }
}

.navbar-nav{
  flex-wrap: wrap;

  @media (min-width: 992px) {
    flex-wrap: nowrap;
  }
}

.nav {
  --color: #ffffff; 
  background: none;
  width: 78px;
  height: 56px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav svg {
  fill: none;
  stroke: var(--color);
  stroke-width: 7px;
  stroke-linecap: round;
  stroke-linejoin: round;
  object-fit: cover;
  max-height: 56px;
}
.nav svg use:nth-of-type(1) {
  opacity: 1;
  stroke-dashoffset: 221;
  stroke-dasharray: 46 249;
  transition: stroke-dashoffset .12s linear .2s, stroke-dasharray .12s linear .2s, opacity 0s linear .2s;  
}
.nav svg use:nth-of-type(2) {
  animation: stroke-animation-reverse 1.2s ease-out forwards;
}
.nav input {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 2;
  cursor: pointer;
  opacity: 0;
}
.nav input:checked + svg use:nth-of-type(1) {
  stroke-dashoffset: 175;
  stroke-dasharray: 0 295;
  opacity: 0;
  transition: stroke-dashoffset .07s linear .07s, stroke-dasharray .07s linear .07s, opacity 0s linear .14s;  
}
.nav input:checked + svg use:nth-of-type(2) {
  animation: stroke-animation 1.2s ease-out forwards;
}

@keyframes stroke-animation {
  0% {
    stroke-dashoffset: 295;
    stroke-dasharray: 25 270;
  }
  50% {
    stroke-dashoffset: 68;
    stroke-dasharray: 59 236;
  }
  65% {
    stroke-dashoffset: 59;
    stroke-dasharray: 59 236;
  }
  100% {
    stroke-dashoffset: 68;
    stroke-dasharray: 59 236;
  }
}

@keyframes stroke-animation-reverse {
  0% {
    stroke-dashoffset: 68;
    stroke-dasharray: 59 236;
  }
  50% {
    stroke-dashoffset: 290;
    stroke-dasharray: 25 270;
  }
  65% {
    stroke-dashoffset: 295;
    stroke-dasharray: 25 270;
  }
  100% {
    stroke-dashoffset: 290;
    stroke-dasharray: 25 270;
  }
}

</style>
