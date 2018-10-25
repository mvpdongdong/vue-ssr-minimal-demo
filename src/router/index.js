import Vue from 'vue';
import Router from 'vue-router';
const Home = () => import('../views/Home.vue');
const Item = () => import('../views/Item.vue');
const notFound = () => import('../views/404.vue');

Vue.use(Router);

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/404', component: notFound },
      { path: '/', component: Home },
      { path: '/item/:id', component: Item },
      { path: '/*', redirect: '/404' }
    ]
  });
}