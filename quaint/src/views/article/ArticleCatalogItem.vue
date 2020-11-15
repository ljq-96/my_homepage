<template>
  <ol>
    <li v-for="item in catalog" :class="{ inview: item.isInView ? true : false }" :key="item.id">
      <span @click="scrollTo(item.id)">{{ item.name }}</span>
      <article-catalog-item v-if="item.children" :catalog="item.children"></article-catalog-item>
    </li>
  </ol>
</template>

<script>
export default {
  name: 'ArticleCatalogItem',
  props: {
    catalog: Array | Object
  },
  methods: {
    scrollTo(id) {
      document.querySelector(`[data-id="${id}"]`).scrollIntoView()
      this.$store.commit('changePageDirection', true)
    }
  }
}
</script>

<style scoped>
.article-catalog ol {
  list-style-position: inside;
}

.article-catalog .inview {
  color: var(--color);
  font-weight: bold;
}

.article-catalog span:hover {
  text-decoration: underline;
}

.article-catalog li {
  color: #4a4a4a;
  font-weight: normal;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.article-catalog ol ol {
  padding-left: 1em;
}
</style>
