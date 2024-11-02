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
        aboutText.classList.remove('animate__bounceOut'); // Assicurati di rimuovere la classe di chiusura
        aboutText.classList.add('animate__animated', 'animate__bounceIn'); // Aggiungi animazione di apertura
        aboutText.style.display = 'block'; // Mostra il paragrafo

        // Usando setTimeout per rimuovere l'opacità per evitare conflitti di animazione
        setTimeout(() => {
          aboutText.style.opacity = '1'; // Mostra il paragrafo dopo che è visibile
        }, 10); // Piccolo timeout per permettere l'applicazione dell'animazione
      }
    });

    overlay.addEventListener('click', function() {
      colAbout.classList.remove('active');
      aboutText.classList.remove('animate__bounceIn'); // Rimuovi animazione di apertura
      aboutText.classList.add('animate__bounceOut'); // Aggiungi animazione di chiusura

      // Utilizza un timeout per rimuovere completamente il paragrafo
      setTimeout(() => {
        aboutText.style.opacity = '0'; // Nascondi il paragrafo dopo l'animazione
        setTimeout(() => {
          aboutText.style.display = 'none'; // Nascondi il paragrafo dopo l'animazione
          aboutText.classList.remove('animate__bounceOut'); // Rimuovi animazione di chiusura
        }, 500); // Assicurati che corrisponda alla durata dell'animazione di chiusura
      }, 500); // Durata dell'animazione di chiusura
    });

    aboutText.addEventListener('click', function() {
      colAbout.classList.remove('active');
      aboutText.classList.remove('animate__bounceIn'); // Rimuovi animazione di apertura
      aboutText.classList.add('animate__bounceOut'); // Aggiungi animazione di chiusura

      setTimeout(() => {
        aboutText.style.opacity = '0'; // Nascondi il paragrafo dopo l'animazione
        setTimeout(() => {
          aboutText.style.display = 'none'; // Nascondi il paragrafo dopo l'animazione
          aboutText.classList.remove('animate__bounceOut'); // Rimuovi animazione di chiusura
        }, 500); // Assicurati che corrisponda alla durata dell'animazione di chiusura
      }, 500); // Durata dell'animazione di chiusura
    });
  }
}
</script>





<template>
  <footer class="bg-dark text-white text-center pb-3">
    <div class="container">
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
</template>


<style lang="scss" scoped>

footer{

  max-height: 300px;

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




@media (max-width: 768px) {


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