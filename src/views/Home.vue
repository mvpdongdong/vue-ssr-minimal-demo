<template>
  <div>
    <h2>文章列表</h2>
    <div class="list" v-for="i in list">
      <router-link :to="{path:'/item/'+i.id}">{{i.title}}</router-link>
    </div>
  </div>
</template>
<script>
import headMixin from '../utils/headMixin';

export default {
  mixins: [headMixin],
  head () {
    return {
      title: '文章列表',
      keywords: 'Vue SSR, 文章列表',
      description: 'Vue SSR文章列表'
    };
  },
  asyncData ({ store, route, config }) {
    return store.dispatch('fetchList', config);
  },
  computed: {
    list () {
      return this.$store.state.list;
    },
    fooCount () {
      return this.$store.state.foo.count;
    }
  }
};
</script>
<style scoped lang="scss">
h2 {
  font-size: 20px;
  color: #e43;
}
</style>
