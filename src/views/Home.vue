<template>
  <div>
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
  asyncData ({ store, route }) {
    return store.dispatch('fetchList');
  },
  computed: {
    list () {
      return this.$store.state.list;
    }
  },
  data () {
    return {
      name: 'wfz'
    };
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
