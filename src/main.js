import { createApp } from 'vue';
import "bootstrap/dist/css/bootstrap.css";
import './style.css';
import App from './App.vue';
import { router } from './router.js';
import "bootstrap/dist/js/bootstrap.js";
import pokemon from 'pokemontcgsdk';

pokemon.configure({ apiKey: '7c1da767-856c-4eac-9b42-68ed220d3a78' });

const app = createApp(App);

app.config.globalProperties.$pokemonApi = pokemon;

app.use(router).mount('#app');
