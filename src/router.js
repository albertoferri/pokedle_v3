import { createRouter, createWebHistory } from 'vue-router';
import Homepage from './pages/Homepage.vue';
import PokemonCard from './pages/PokemonCard.vue';
import CardDetail from './pages/CardDetail.vue';
import GuessCard from './pages/GuessCard.vue';
import statistics from './components/statistics.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Homepage
    },
    {
      path: '/pokemon',
      name: 'pokemon',
      component: PokemonCard
    },
    {
      path: '/card/:id',
      name: 'cardDetail',
      component: CardDetail,
      props: true
    },
    {
      path: '/guess',
      name: 'guessCard',
      component: GuessCard
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: statistics
    }
  ]
});

export { router };
