<template>
  <div>
    <span v-if="!item">loading</span>
    <div v-if="item">
     <h2>{{item.title}}</h2>
      <div v-html="item.content"></div>
    </div>

  </div>
</template>
<script>
export default {
  asyncData ({ store, route, config }) {
    config.params = {
      id: route.params.id
    };
    return store.dispatch('fetchItem', config);
  },
  computed: {
    item () {
      return this.$store.state.items[this.$route.params.id];
    }
  },
  mounted () {
    console.log('item logeed');
  }
};
</script>
<style scoped lang="scss">
body h2 {
  color: #e43;
}
</style>