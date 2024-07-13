import { createRouter, createWebHistory } from 'vue-router';
import CardList from '@/views/CardList.vue';
import ItemPage from '@/views/ItemPage.vue';

const routes = [
  { path: '/', component: CardList },
  { path: '/item/:id', component: ItemPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;