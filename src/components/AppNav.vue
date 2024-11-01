<script>
export default {
  name: 'AppNav'
};
</script>

<template>
  <nav class="navbar bg-dark border-bottom border-warning navbar-expand-lg">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <img class="img-fluid h-100" src="https://static.vecteezy.com/system/resources/previews/027/127/571/non_2x/pokemon-logo-pokemon-icon-transparent-free-png.png" alt="logo nav">
      </router-link>
      <button class="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active fw-bold text-light mx-3 btn btn-warning bg-dark" aria-current="page" to="/">POKÉDEX</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active fw-bold text-danger mx-3 btn btn-warning bg-dark" aria-current="page" to="/pokemon">CARTE</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active fw-bold text-primary mx-3 btn btn-warning bg-dark" aria-current="page" to="/guess">GUESS THE CARD</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle fw-bold mx-3 text-light" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fa-solid fa-dna"></i> GEN
            </a>
            
          </li>
        </ul>
        <form class="d-flex" role="search">
          <input class="form-control bg-body-secondary border border-2 border-warning me-2" disabled type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-lg btn-outline-warning border border-2 border-warning fw-bold bg-secondary" type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
        </form>
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
nav {
  .navbar-brand {
    height: 100px;
  }
}
</style>
