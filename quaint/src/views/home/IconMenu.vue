<template>
  <div @click.stop class="menu">
    <ul>
      <div class="menu- blur"></div>
      <li class="menu-size">
        <p class="menu-item blur">
          <span><span class="iconfont icon-appstore"></span> 调整大小</span>
          <span><span class="iconfont icon-right"></span></span>
        </p>
        <ul class="submenu">
          <div class="menu- blur"></div>
          <li @click="onInput('size', 'small')" class="menu-item blur">
            <span><span class="iconfont icon-xiao"></span> 小</span>
            <span class="iconfont icon-check" v-if="value.size === 'small'"></span>
          </li>
          <li @click="onInput('size', 'middle')" class="menu-item blur">
            <span><span class="iconfont icon-zhong"></span> 中</span>
            <span class="iconfont icon-check" v-if="value.size === 'middle'"></span>
          </li>
          <li @click="onInput('size', 'wide')" class="menu-item blur">
            <span><span class="iconfont icon-kuan"></span> 宽</span>
            <span class="iconfont icon-check" v-if="value.size === 'wide'"></span>
          </li>
          <li @click="onInput('size', 'large')" class="menu-item blur">
            <span><span class="iconfont icon-da"></span> 大</span>
            <span class="iconfont icon-check" v-if="value.size === 'large'"></span>
          </li>
          <div class="menu- blur"></div>
        </ul>
      </li>
      <li class="menu-edit">
        <p class="menu-item blur">
          <span><span class="iconfont icon-edit-square"></span> 编辑</span>
          <span><span class="iconfont icon-right"></span></span>
        </p>
        <ul class="submenu">
          <div class="menu- blur"></div>
          <li class="menu-item blur">
            <label>网址:</label
            ><input spellcheck="false" type="text" :value="value.url" @input="onInput('url', $event)" />
          </li>
          <li class="menu-item blur">
            <label>图标:</label
            ><input spellcheck="false" type="text" :value="value.icon" @input="onInput('icon', $event)" />
          </li>
          <li class="menu-item blur">
            <label>标题:</label
            ><input spellcheck="false" type="text" :value="value.title" @input="onInput('title', $event)" />
          </li>
          <div class="menu- blur"></div>
        </ul>
      </li>
      <li>
        <p @click="del" class="menu-item blur">
          <span><span class="iconfont icon-delete"></span> 删除</span>
        </p>
      </li>
      <div class="menu- blur"></div>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object
    }
  },
  methods: {
    onInput(key, e) {
      const icon = { ...this.value }
      icon[key] = typeof e === 'string' ? e : e.target.value
      this.$emit('input', icon)
      if (key === 'size') {
        this.$emit('closeMenu')
      }
    },
    del() {
      this.$emit('delItem')
    }
  }
}
</script>

<style scoped>
.menu {
  position: absolute;
  width: 150px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
  color: #4a4a4a;
  z-index: 999;
}

.menu li {
  list-style: none;
}

.menu-size,
.menu-edit {
  position: relative;
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 0 10px;
}

.menu-item:hover {
  background: rgba(225, 225, 225, 0.6);
}

.submenu {
  position: absolute;
  left: 146px;
  top: -5px;
  height: 0;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
  color: #4a4a4a;
  overflow: hidden;
  z-index: 10;
  white-space: wrap;
}

.submenu label {
  white-space: nowrap;
  margin-right: 5px;
}

.menu-size .submenu {
  width: 100px;
}

.menu-size:hover .submenu {
  height: 170px;
  transition: 0.4s;
}

.menu-edit .submenu {
  width: 240px;
}

.menu-edit:hover .submenu {
  height: 130px;
  transition: 0.4s;
}

.menu- {
  height: 5px;
}

input {
  flex-grow: 1;
  background-color: rgba(0, 0, 0, 0.1);
  height: 26px;
  padding-left: 5px;
  border: none;
  outline: none;
  font-family: Ubuntu;
}

.menu-item:hover > input {
  background-color: rgba(255, 255, 255, 0.6);
}
</style>
