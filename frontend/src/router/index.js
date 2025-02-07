import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home.vue';
import Movies from '../views/movies.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/movies',
    name: 'Movies',
    component: Movies
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
