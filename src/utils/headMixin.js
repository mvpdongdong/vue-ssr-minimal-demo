function getHead (vm) {
  const { head } = vm.$options;
  if (head) {
    return typeof head === 'function' ? head.call(vm) : head;
  }
}

function changeMetaContent (name, content) {
  const meta = document.querySelector(`meta[name=${name}]`);
  meta.content = content;
}

const serverHeadMixin = {
  created () {
    const head = getHead(this);
    if (head) {
      this.$ssrContext.title = `Vue SSR | ${head.title}`;
      this.$ssrContext.keywords = `Vue SSR | ${head.keywords}`;
      this.$ssrContext.description = `Vue SSR | ${head.description}`;
    }
  }
};

const clientHeadMixin = {
  mounted () {
    const head = getHead(this);
    if (head) {
      document.title = `Vue SSR | ${head.title}`;
      changeMetaContent('keywords', `Vue SSR | ${head.keywords}`);
      changeMetaContent('description', `Vue SSR | ${head.description}`);
    }
  }
};

export default process.env.VUE_ENV === 'server'
  ? serverHeadMixin
  : clientHeadMixin;