<template>
  <div>
    {{$store.state.foo.count}}
    <demo></demo>
    <h3>文章列表</h3>
    <div class="list" v-for="i in list">
      <router-link :to="{path:'/item/'+i.id}">{{i.title}}</router-link>
    </div>
  </div>
</template>
<script>
import Demo from '../components/demo';

export default {
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
  },
  components: {
    Demo
  }
};
</script>
<style scoped lang="scss">
body h3 {
  color: #333;
}
</style>
