<script>
export default {
  name: 'ColAbout',
  mounted() {
    const colAbout = this.$el.querySelector('.col-about');
    const pokeAbout = colAbout.querySelector('.poke-about');
    const overlay = colAbout.querySelector('.overlay');
    const aboutText = colAbout.querySelector('.about-text');

    pokeAbout.addEventListener('click', function() {
      if (!colAbout.classList.contains('active')) {
        colAbout.classList.add('active');
        aboutText.classList.remove('animate__bounceOut'); 
        aboutText.classList.add('animate__animated', 'animate__bounceIn'); 
        aboutText.style.display = 'block'; 

        
        setTimeout(() => {
          aboutText.style.opacity = '1'; 
        }, 10); 
      }
    });

    overlay.addEventListener('click', function() {
      colAbout.classList.remove('active');
      aboutText.classList.remove('animate__bounceIn'); 
      aboutText.classList.add('animate__bounceOut'); 

      
      setTimeout(() => {
        aboutText.style.opacity = '0'; 
        setTimeout(() => {
          aboutText.style.display = 'none'; 
          aboutText.classList.remove('animate__bounceOut'); 
        }, 500); 
      }, 500); 
    });

    aboutText.addEventListener('click', function() {
      colAbout.classList.remove('active');
      aboutText.classList.remove('animate__bounceIn'); 
      aboutText.classList.add('animate__bounceOut'); 

      setTimeout(() => {
        aboutText.style.opacity = '0'; 
        setTimeout(() => {
          aboutText.style.display = 'none'; 
          aboutText.classList.remove('animate__bounceOut'); 
        }, 500); 
      }, 500); 
    });
  }
}
</script>





<template>
  <footer class="text-white text-center pb-3 d-none d-lg-block">
    <div class="container-fluid container-xl">
      <div class="row">
        <div class="col-about col-10 offset-1 offset-md-0 col-md-4 d-flex flex-column justify-content-center align-items-center">
          <img class="footer-img poke-about mt-5 mt-md-0" src="../assets/poke-about-xl.png" alt="pokèabout image">
          <p class="about-text">A Pokémon fun-made app using Pokémon TCG API to provide information about various Pokémon.</p>
          <div class="overlay"></div>
        </div>
        <div class="col-12 col-md-4 mb-3 mb-md-0">
          <img class="img-fluid footer-img pokemulti" src="../assets/pokémulti.png" alt="pokèmulti image">
        </div>
        <div class="col-12 col-md-4 d-flex flex-column justify-content-center align-items-center">
          <a class="mailto d-flex justify-content-center align-items-center" href="mailto:infopokedle@gmail.com">
            <img class="footer-img default-img" src="../assets/poke-contact-xl.png" alt="pokècontact image">
            <img class="footer-img hover-img" src="../assets/poke-contact-xl-h.png" alt="pokècontact image">
          </a>

        </div>
      </div>
      <div class="sub-footer">
        <p class="mb-0">&copy; 2024 Pokédle. All rights reserved.</p>
      </div>
    </div>
  </footer>
  

  <section class="stickynav d-block d-lg-none bg-light">

    <div class="container-fluid">
      <div class="row">
      
        <router-link to="/" class="col-4 d-flex align-items-center justify-content-center p-2 text-dark text-decoration-none">
          <i class="fa-solid fa-house-crack fa-2xl"></i>
        </router-link>
        <router-link to="/sets" class="col-4 d-flex justify-content-center align-items-center p-2 text-dark text-decoration-none">
          <i class="fa-solid fa-vault fa-2xl"></i>
        </router-link>
        <button class="col-4 d-flex align-items-center justify-content-center p-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
          <i class="fa-solid fa-gear fa-2xl fa-spin"></i>
        </button>
        
      </div>
    </div>


    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel" data-bs-theme="dark">
      <div class="offcanvas-body">
        <h4>EHI HAI APERTO LE IMPOSTAZIONI <span class="d-block mt-2 glow">STAI GASANDO!</span></h4>
        <h6 class="mt-5">NON CI SONO IMPOSTAZIONI AHAHAHAHAH</h6>
      </div>
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasRightLabel">SETTINGS</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
    </div>

  </section>
</template>


<style lang="scss" scoped>

.stickynav{

  .row{
    height: 60px;
    
  }


  height: 60px !important;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1000;

  button{
    background-color: transparent;
    border: 0;
    color: #171a1d;
  }


  .offcanvas-body{

    .glow {
      color: #fff; /* Colore del testo */
      text-shadow: -1px 0px 5px #fff, 
      -4px 1px 10px #fff, 
      -8px -3px 15px #fff, 
      0 0 20px #ff00ff, 
      -2px -1px 30px #ff00ff, 
      0 0 40px #ff00ff, 
      0 0 55px #ff00ff, 
      -3px -20px 75px #ff00ff;
    }

  }
}

footer{

  background-color: #171a1d;


  // max-height: 300px;



  .pokemulti{
    height: auto;
    max-width: 58%;
  }

  .col-about {
    position: relative;

    .poke-about {
      width: 50%;
      cursor: pointer;
    }

    .about-text {
      position: absolute;
      transform: translate(-50%, -50%);
      text-align: center;
      display: none; // Inizialmente nascosto
      background-color: #ffcd29;
      color: black;
      padding: 12px 15px;
      font-weight: bold;
      border-radius: 15px;
      opacity: 0; // Imposta opacità a 0 per animazione
      transition: opacity 0.3s ease; // Transizione per l'opacità
    }

    .overlay {
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
      z-index: 10;
    }

    &.active .about-text {
      display: block; // Mostra il paragrafo
      opacity: 1; // Cambia opacità per mostrare
    }

    &.active .overlay {
      display: block;
    }
  }


  .mailto {
  position: relative;
  display: inline-block;
  top: -30px;
  height: auto;
  width: 70%;

  .default-img,
  .hover-img {
    position: absolute; // Sovrapponi le immagini
    top: 0;
    left: 0;
    width: 100%; // Assicurati che riempiano il contenitore
    height: auto; // Mantieni l'aspetto dell'immagine
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    z-index: 1; // Assicurati che l'immagine hover sia sopra
  }

  .hover-img {
    opacity: 0; // L'immagine hover è nascosta inizialmente
  }

  &:hover {
    .default-img {
      opacity: 0; // L'immagine di default svanisce
      transform: scale(1.1); // Effetto di zoom sull'immagine di default
    }

    .hover-img {
      opacity: 1; // L'immagine hover appare
      transform: scale(1.1); // Effetto di zoom sull'immagine hover
    }
  }
}


.sub-footer{
  margin-top: 1rem;
}


@media (min-width: 768px) and (max-width: 991px) {


  
}




@media (max-width: 767px) {


  .poke-about,
  .pokemulti{
    max-width: 40% !important;
  }

  .default-img,
  .hover-img{
    max-width: 70% !important;
    margin-left: 15%;
    margin-top: 18px;
  }
  
  .sub-footer{
    margin-top: 100px;
  }
}







}
    
</style>