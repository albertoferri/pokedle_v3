<script>
export default {
  name: 'AppNav'
};
</script>

<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <img class="img-fluid h-75 mt-2 ms-4" src="../assets/poke-logo-new.png" alt="logo nav">
      </router-link>
      <button class="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active fw-bold text-light mx-3 btn btn-warning bg-dark" aria-current="page" to="/sets">SCOPRI I SET</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active fw-bold text-danger mx-3 btn btn-warning bg-dark" aria-current="page" to="/pokemon">CARTE</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active fw-bold text-primary mx-3 btn btn-warning bg-dark" aria-current="page" to="/guess">GUESS THE CARD</router-link>
          </li>
          
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
}
</style>
