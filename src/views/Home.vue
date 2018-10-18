<template>
  <div>
    {{fooCount}}
    <demo></demo>
    <h3>文章列表</h3>
    <div class="list" v-for="i in list">
      <router-link :to="{path:'/item/'+i.id}">{{i.title}}</router-link>
    </div>
  </div>
</template>
<script>
import Demo from '../components/demo';
import fooStoreModule from '../store/modules/foo';

export default {
  asyncData ({ store, route }) {
    store.registerModule('foo', fooStoreModule);
    return Promise.all([
      store.dispatch('foo/inc'),
      store.dispatch('fetchList')
    ]);
  },
  destroyed () {
    this.$store.unregisterModule('foo');
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
