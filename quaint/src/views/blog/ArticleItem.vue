<template>
  <div class="item article-content">
    <span class="time">{{ $dateFormatter(time, '-', 3) }}</span>
    <router-link
      class="title"
      :to="{ path: '/article', query: { title: title } }"
      >{{ title }}</router-link
    >
    <div class="desc" v-html="truncate"></div>
    <div class="tags">
      <div @click="send(item)" v-for="item in tags" :key="item">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    time: String,
    tags: Array,
    truncate: String
  },
  methods: {
    send(data) {
      this.$emit('send', data)
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/code.css';
@import '../../assets/css/blog.css';
.item {
  margin-bottom: 4px;
  padding: 15px;
  background-color: #fff;
}

.time {
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  color: #bdbdbd;
}

.title {
  display: block;
  position: relative;
  height: 40px;
  padding-left: 15px;
  line-height: 40px;
  font-size: 24px;
  color: #4a4a4a;
}

.title:hover {
  color: var(--color);
}

.title::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 3px;
  height: 26px;
  background-color: var(--color);
}

.tags {
  margin: 10px 0;
}

.tags div {
  display: inline-block;
  margin-right: 6px;
  padding: 1px 8px;
  font-size: 12px;
  color: #7a7a7a;
  background-color: #fafafa;
}

.tags div:hover {
  color: #fff;
  background-color: var(--color);
}
</style>
