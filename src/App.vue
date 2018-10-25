<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>
<style lang="scss">
body #app {
  font-size: 18px;
  line-height: 1.5;
}
.view {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}
.fade-enter-active, .fade-leave-active {
  transition: all .2s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>

