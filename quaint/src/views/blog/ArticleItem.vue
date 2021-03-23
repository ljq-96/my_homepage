<template>
  <q-card class="article-item article-content">
    <template #title>
      <div class="aiticle-item-head">
        <span>{{ time | formatDate('YYYY-MM-DD') }}</span>
      </div>
      <router-link
        class="aiticle-item-title"
        :to="{ path: '/quaint/article', query: { title: title } }"
        >{{ title }}</router-link
      >
    </template>
    <template #content>
      <div class="desc" v-html="truncate"></div>
      <div class="aiticle-item-head">
        <q-tag @click.native="send(item)" v-for="item in tags" :key="item"
          >#{{ item }}</q-tag
        >
      </div>
    </template>
  </q-card>
</template>

<script>
import QCard from '../../components/other/QCard'
import QTag from '../../components/other/QTag'
export default {
  components: {
    QTag,
    QCard
  },
  props: {
    title: String,
    time: String,
    tags: Array,
    truncate: String
  },
  methods: {
    send(data) {
      this.$router.push({ path: '/quaint/blog', query: { tag: data } })
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/code.css';
@import '../../assets/css/blog.css';
.article-item {
  margin: 15px 0;
}

.aiticle-item-head {
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  color: var(--disabled);
}

.aiticle-item-title {
  display: block;
  position: relative;
  height: 40px;
  line-height: 40px;
  font-size: 24px;
  color: var(--title);
}

.aiticle-item-title:hover {
  color: var(--color);
}
</style>
