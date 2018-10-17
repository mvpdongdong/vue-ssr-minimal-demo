import Vue from 'vue'
import { createApp } from './app';
const { app, router, store } = createApp();
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // Progress 进度条样式

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

router.onReady(() => {
  // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);

    let diffed = false;
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = prevMatched[i] !== c);
    });

    if (!activated.length) {
      return next();
    }

    // 这里如果有加载指示器(loading indicator)，就触发
    NProgress.start();

    Promise.all(
      activated.map(component => {
        if (component.asyncData) {
          component.asyncData({
            store,
            route: to
          });
        }
      })
    )
      .then(() => {
        // 停止加载指示器(loading indicator)
        NProgress.done();
        next();
      })
      .catch(next);
  });
  app.$mount('#app');
});
