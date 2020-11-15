<template>
  <ul class="catalog-item">
    <li :class="{ openCatalog: item.isOpen }" v-for="item in catalog" :key="item._id">
      <div
        class="drag-container"
        :class="{ current: current === item.title }"
        @dragstart="dragStart(item, $event)"
        @dragover.prevent
        @dragover="dragOver(item, $event)"
        @dragleave="dragLeave"
        @drop.stop="drop(item, $event)"
      >
        <span class="iconfont catalog-item-icon" @click="toggleCatalog(item)">
          <span class="icon-sanjiao" v-if="item.children.length"></span>
        </span>
        <span
          class="catalog-item-title"
          :class="{ isEdit: isEdit, isArticle: item.type === 'DOC' }"
          :draggable="isEdit"
          @click="toArticle(item)"
          @dblclick="onEdit"
          @blur="changeTitle(item._id, $event)"
        >
          {{ item.title }}
        </span>

        <span v-if="isEdit" class="iconfont catalog-item-remove icon-export" @click="removeCatalog(item._id)"></span>
      </div>
      <catalog-item
        v-if="item.children.length"
        :catalog="item.children"
        :isEdit="isEdit"
        :current="current"
      ></catalog-item>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'CatalogItem',
  props: {
    catalog: Array | Object,
    isEdit: {
      type: Boolean,
      default: false
    },
    current: String
  },
  computed: {
    height() {
      return function(item) {
        if (item.isOpen) {
          return (item.children.length + 1) * 30 + 'px'
        } else {
          return 30 + 'px'
        }
      }
    }
  },
  methods: {
    toggleCatalog(item) {
      this.$set(item, 'isOpen', !item.isOpen)
      this.$bus.$emit('saveOpen', {
        name: item.title,
        isOpen: item.isOpen
      })
    },
    onEdit(e) {
      if (this.isEdit) {
        e.target.setAttribute('contenteditable', true)
        e.target.focus()
      }
    },
    toArticle(item) {
      if (!this.isEdit && item.type === 'DOC') {
        this.$router.push({ path: '/article', query: { title: item.title } })
      }
    },
    changeTitle(id, e) {
      this.$request({
        url: 'blog/update',
        method: 'post',
        data: {
          _id: id,
          info: {
            title: e.target.innerText
          }
        }
      }).then(res => {
        if (res.code === 200) {
          e.target.removeAttribute('contenteditable')
        }
      })
    },
    dragStart(item, e) {
      item.isOpen = false
      e.dataTransfer.setData('item', JSON.stringify(item))
    },
    dragOver(targetItem, e) {
      const node = e.target.tagName === 'SPAN' ? e.target.parentNode : e.target
      if (e.offsetX >= 30) {
        node.classList.remove('move-after')
        node.classList.add('prepend-child')
      } else {
        node.classList.remove('prepend-child')
        node.classList.add('move-after')
      }
    },
    dragLeave(e) {
      const node = e.target.tagName === 'SPAN' ? e.target.parentNode : e.target
      node.classList.remove('move-after', 'prepend-child')
    },
    drop(targetItem, e) {
      const node = e.target.tagName === 'SPAN' ? e.target.parentNode : e.target
      const action = e.offsetX >= 30 ? 'prependChild' : 'moveAfter'
      node.classList.remove('move-after', 'prepend-child')
      const item = JSON.parse(e.dataTransfer.getData('item'))

      if (targetItem._id !== item._id && targetItem._id !== item.prev__id) {
        this.$bus.$emit('catalogUpdate', {
          _id: item._id,
          target_id: targetItem._id,
          action: action
        })
      }
    },
    removeCatalog(id) {
      this.$bus.$emit('catalogUpdate', {
        _id: id,
        action: 'remove'
      })
    }
  }
}
</script>

<style>
.catalog-item {
  list-style: none;
}

.catalog-item li {
  margin: 4px 0;
}

.catalog-item .catalog-item {
  margin-left: 10px;
  display: none;
  border-left: 1px solid var(--_backColor);
}

.catalog-item .catalog-item:hover {
  border-color: var(--color);
}

.catalog-item .openCatalog > .catalog-item {
  display: block;
}

.drag-container {
  display: flex;
  align-items: center;
  position: relative;
  height: 30px;
  padding: 0 4px;
  border-radius: 5px;
  /* transition: 0.2s; */
}

.drag-container:hover {
  background-color: var(--backColor);
}

.drag-container.current {
  color: var(--color);
  font-weight: bold;
}

.drag-container .catalog-item-icon {
  width: 10px;
  margin-right: 6px;
  font-size: 12px;
  text-align: center;
}

.catalog-item .openCatalog > .drag-container > .catalog-item-icon {
  transform: rotate(90deg);
}

.drag-container .catalog-item-title {
  flex-grow: 1;
  border: 2px solid transparent;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: 0.2s;
}

.drag-container .catalog-item-title.isArticle {
  cursor: pointer;
}

.drag-container .catalog-item-title.isArticle:not(.isEdit):hover {
  text-decoration: underline;
}

.drag-container .catalog-item-title.isEdit {
  cursor: grab;
}

.drag-container .catalog-item-title.isEdit:active {
  cursor: grabbing;
}

.drag-container .catalog-item-title[contenteditable] {
  background: #eee;
  border: 2px solid #aaa;
  padding-left: 10px;
  outline: none;
}

.drag-container .catalog-item-remove {
  visibility: hidden;
  width: 60px;
  font-size: 18px;
  line-height: 28px;
  text-align: center;
}

.drag-container .catalog-item-remove:hover {
  background-color: #eee;
}

.drag-container:hover .catalog-item-remove {
  visibility: visible;
}

.drag-container.move-after::after {
  content: '';
  position: absolute;
  left: 20px;
  right: 0;
  height: 2px;
  background-color: var(--color);
  bottom: 0;
}

.drag-container.prepend-child::after {
  content: '';
  position: absolute;
  left: 50px;
  right: 0;
  height: 2px;
  background-color: var(--color);
  bottom: 0;
}
</style>
