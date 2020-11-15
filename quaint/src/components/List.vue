<template>
  <div ref="i" class="list">
    <div class="list-title">{{ title }}</div>
    <fluent-design v-slot="param" :width="1" :borderSize="60" :borderColor="'var(--color)'" :backColor="'var(--_backColor)'" :backSize="200">
      <fluent-design-item :param="param" v-for="item in data" :key="item.index">
        <a target="_blank" :href="item.link" @click="send(item.title)" class="item" :style="{ padding: `${gap}px 12px` }">
          <span v-if="item.index" class="list-index">{{ item.index + '.' }}</span>
          <div class="content">
            <div>{{ item.title }}</div>
            <div v-if="item.subtitle">{{ item.subtitle }}</div>
          </div>
          <span v-if="item.info" class="info">{{ item.info }}</span>
        </a>
      </fluent-design-item>
    </fluent-design>
  </div>
</template>

<script>
import FluentDesign from './FluentDesign'
import FluentDesignItem from './FluentDesignItem'
export default {
  components: {
    FluentDesign,
    FluentDesignItem
  },
  props: {
    title: String,
    data: Array,
    click: Boolean,
    gap: {
      type: Number,
      default: 6
    }
  },
  methods: {
    send(data) {
      if (this.click) {
        this.$emit('send', data)
      }
    }
  }
}
</script>

<style scoped>
.list {
  padding: 10px 0;
  margin-bottom: 8px;
  line-height: 1.4em;
}

.item {
  display: flex;
  padding: 0 12px;
}

.list-title {
  height: 30px;
  padding: 0 12px;
  line-height: 30px;
  font-size: 16px;
  margin-bottom: 8px;
}

.list-index {
  margin-right: 5px;
}

.content {
  flex-grow: 1;
}

.content div {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.content div:nth-child(2) {
  font-size: 12px;
  color: #7a7a7a;
}

.info {
  padding: 0 5px;
  font-size: 12px;
  border-radius: 2px;
  background-color: var(--backColor);
}
</style>
