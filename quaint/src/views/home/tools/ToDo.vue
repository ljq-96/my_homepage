<template>
  <div :class="{ onadd: isOpen }" class="todo">
    <fluent-design
      v-slot="param"
      :borderSize="50"
      :backSize="400"
      :width="1"
      :backColor="'rgba(255,255,255,0.1)'"
      :borderColor="'rgba(255,255,255,0.6)'"
      v-if="list"
      class="todo-list-container"
    >
      <fluent-design-item :param="param" v-for="(item, index) in list" :key="item.value">
        <div :class="{ complete: item.complete }" @click="click(index)" class="todo-list">
          <div
            @click.stop="removeItem(index)"
            @mouseover="mouseoverIndex = item.complete ? index : -1"
            @mouseleave="mouseoverIndex = -1"
            class="tick-box"
          >
            <checkbox-svg :state="setState(index)" :size="16"></checkbox-svg>
          </div>
          <span>{{ item.value }}</span>
        </div>
      </fluent-design-item>
    </fluent-design>

    <div class="input-group">
      <input @keyup.13="addItem" v-model="value" type="text" placeholder="New Task" spellcheck="false" />
      <button @click="addItem">
        <div></div>
      </button>
    </div>
    <div class="title">ToDoList</div>
    <div v-if="!list.length" class="default">
      <pre><code><i>let</i> you = <i>function</i> future() {};
<span>// 春风十里 ,</span>
<i>let</i> spring = {
    "breezing": true,
    "length": 10
};
<i>let</i> i = [];
i.push(spring, you);
i.sort() === [you, spring];</code></pre>
    </div>
  </div>
</template>

<script>
import FluentDesign from '../../../components/FluentDesign'
import FluentDesignItem from '../../../components/FluentDesignItem'
import CheckboxSvg from '@/components/CheckboxSvg'
export default {
  components: {
    FluentDesign,
    FluentDesignItem,
    CheckboxSvg
  },
  data() {
    return {
      list: JSON.parse(window.localStorage.getItem('list')) || [],
      isOpen: false,
      value: '',
      isDel: false,
      mouseoverIndex: -1
    }
  },
  methods: {
    click(index) {
      console.log(this.list[index].complete)
      this.list[index].complete = !this.list[index].complete
      window.localStorage.list = JSON.stringify(this.list)
    },
    addItem() {
      this.isOpen = !this.isOpen
      if (this.value) {
        this.list.push({ value: this.value, complete: false })
        this.value = ''
      }
      window.localStorage.list = JSON.stringify(this.list)
    },
    removeItem(index) {
      if (this.list[index].complete) {
        this.list.splice(index, 1)
      } else {
        this.click(index)
      }
      window.localStorage.list = JSON.stringify(this.list)
    }
  },
  computed: {
    setState() {
      return function(index) {
        if (this.list[index].complete) {
          if (this.mouseoverIndex === index) {
            return 2
          }
          return 1
        }
        return 0
      }
    }
  }
}
</script>

<style scoped>
.todo {
  position: relative;
  padding-top: 10px;
  height: 100%;
  background: var(--color);
  overflow: hidden;
}

.todo .title {
  position: absolute;
  left: 5px;
  bottom: 5px;
  transition: 0.5s;
}

.todo.onadd .title {
  bottom: -20px;
}

.todo.onadd .input-group input {
  width: 100%;
  padding: 0 20px;
}

.input-group {
  position: absolute;
  right: 10px;
  left: 10px;
  bottom: 10px;
  transition: 0.5s;
  z-index: 10;
}

.input-group input {
  float: right;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  outline: none;
  border: none;
  padding: 0;
  transition: 0.5s;
}

.input-group input,
.input-group input::placeholder {
  font-family: FiraCode;
  color: var(--color);
}

.input-group input:focus::placeholder {
  color: #fff;
}

/* 添加按钮的默认样式 */
.input-group button {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background: var(--color);
  border: 4px solid #fff;
  border-radius: 50%;
  outline: none;
  transition-property: border;
  transition-duration: 0.5s;
}

.input-group button::after,
.input-group button::before {
  content: '';
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 2px;
  background: #fff;
  transition: 0.5s;
  z-index: 2;
}

.input-group button::after {
  transform: translate(-6px, -4px) rotate(-45deg);
  width: 4px;
  height: 12px;
}

.input-group button::before {
  transform: translate(6px, -18px) rotate(45deg);
  width: 4px;
  height: 28px;
}

.input-group button div {
  position: absolute;
  left: 24px;
  top: -2px;
  width: 10px;
  height: 18px;
  background: var(--color);
  transform: rotate(-30deg);
  transition-property: left, width, height, transform;
  transition-duration: 0.5s;
}

/* 鼠标移入时,添加按钮的样式 */
.todo:hover .input-group button {
  border: 20px solid #fff;
}

.todo:hover .input-group button::after {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) rotate(0deg);
  height: 24px;
  background: var(--color);
}

.todo:hover .input-group button::before {
  transform: translate(-50%, -50%) rotate(90deg);
  height: 24px;
  background: var(--color);
}

.todo:hover .input-group button div {
  left: 0;
  width: 0;
  height: 0;
}

/* 点击事件后,添加按钮的样式 */
.todo.onadd .input-group button {
  border: 4px solid #fff;
}

.todo.onadd .input-group button::after {
  height: 15px;
  background: #fff;
  transform: translate(-5px, -8px) rotate(40deg);
}

.todo.onadd .input-group button::before {
  width: 4px;
  height: 15px;
  background: #fff;
  transform: translate(3px, -8px) rotate(140deg);
}

.todo.onadd .input-group button div {
  width: 0;
  transform: rotate(-30deg) translate(8px, 9px);
}

.todo.onadd .input-group button + p {
  bottom: 20px;
}

.todo-list-container {
  height: 190px;
  margin: 0 10px;
  overflow: auto;
}

.todo-list-container::-webkit-scrollbar {
  width: 0;
}

.todo-list-container:hover::-webkit-scrollbar {
  width: 2px;
}

.todo-list-container:hover::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 1);
}

.todo-list {
  display: flex;
  align-items: center;
  position: relative;
  height: 38px;
  line-height: 38px;
  overflow: hidden;
  transition-property: height;
  transition-duration: 0.5s;
}

.todo-list .tick-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 38px;
  height: 38px;
}

.todo-list.complete .tick-box {
  cursor: pointer;
  pointer-events: all;
}

.todo-list.complete {
  color: rgba(255, 255, 255, 0.5);
  text-decoration: line-through;
  background-color: rgba(255, 255, 255, 0.05);
}

.todo .default {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 12px;
  line-height: 1.7em;
  padding: 10px 8px;
}

.todo .default code {
  color: #fff;
  background-color: transparent;
  font-family: FiraCode;
}

.todo .default span {
  color: rgba(255, 255, 255, 0.4);
  font-style: italic;
}

.todo .default::after {
  content: '';
  display: block;
  width: 2px;
  height: 14px;
  border-radius: 1px;
  background: #fff;
  position: absolute;
  left: 106px;
  top: 33px;
  animation: cursor 1s infinite;
}

@keyframes cursor {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
