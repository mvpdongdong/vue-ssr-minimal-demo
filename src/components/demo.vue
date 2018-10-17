<template>
  <div class="demo">
    <ul>
      <li v-for="item in items">
        {{item.title}}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Demo',
  data () {
    return {
      items: this.$store.state.list
    };
  }
};
</script>

<style lang="scss" scoped>
.demo {
  color: red;
}
</style>
