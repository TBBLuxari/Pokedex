import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue'
import Busqueda from './views/Busqueda.vue';
import MissingNo from './views/MissingNo.vue'

const routes = 
[
  {path: '/Pokedex', name: 'Home', component: Home, },
  {path: '/Pokedex/Search/:pokemon?', name: 'Search',component: Busqueda, },
  {path: '/Pokedex/MissingNo', name: 'MissingNo',component: MissingNo, }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;