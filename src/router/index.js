import Vue from 'vue';
import Router from 'vue-router';
const Home = () => import(/* webpackChunkName: "home" */ '../views/Home.vue');
const Item = () => import(/* webpackChunkName: "item" */ '../views/Item.vue');
const notFound = () => import(/* webpackChunkName: "404" */ '../views/404.vue');

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