<template>
  <div>
    <div class="article-catalog-title">Catalog</div>
    <article-catalog-item @mousewheel.stop :catalog="catalog"></article-catalog-item>
  </div>
</template>

<script>
import ArticleCatalogItem from '@/views/article/ArticleCatalogItem'
export default {
  components: {
    ArticleCatalogItem
  },
  props: {
    catalog: Array | Object
  }
}
</script>

<style scoped>
.article-catalog .article-catalog-title {
  font-size: 16px;
  margin-bottom: 5px;
}

.article-catalog > ol {
  scroll-behavior: smooth;
}
</style>
