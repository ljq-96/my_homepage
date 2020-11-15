<template>
  <div @click.stop @mousewheel.prevent class="confirm-wrap">
    <transition name="confirm">
      <fluent-design v-show="visible" v-slot="param" :borderColor="'rgba(0,0,0,0.4)'" :borderSize="50" class="confirm">
        <fluent-design-item :param="param" :isRotate="false">
          <div class="confirm-content">
            <p>{{ title }}</p>
            <div class="btn-group">
              <fluent-design-item :param="param"
                ><button class="confirm-btn" @click="confirm">确定</button></fluent-design-item
              >
              <fluent-design-item :param="param"><button @click="cancel">取消</button></fluent-design-item>
            </div>
          </div>
        </fluent-design-item>
      </fluent-design>
    </transition>
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
    title: {
      type: String,
      default: 'alert'
    }
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    confirm() {
      this.$emit('confirm')
      this.remove()
    },
    cancel() {
      this.$emit('cancel')
      this.remove()
    },
    remove() {
      this.visible = false
      this.$el.addEventListener('transitionend', this.removeEl)
    },
    removeEl() {
      this.$el.parentNode.removeChild(this.$el)
      this.$destroy()
      this.$el.removeEventListener('transitionend', this.removeEl)

    }
  },
  mounted() {
    this.visible = true
  }
}
</script>

<style>
.confirm-wrap {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(5px);
  z-index: 999;
}

.confirm {
  width: 300px;
  margin: 50px auto;
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); */
  transition: 0.4s;
}

.confirm .confirm-content {
  padding: 20px;
  font-size: 20px;
  color: #4a4a4a;
  /* box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); */
  background-color: var(--_backColor);
}

.confirm p {
  margin-bottom: 20px;
}

.confirm .btn-group {
  display: flex;
}

.confirm .btn-group > div {
  margin-right: 10px;
}

.confirm button {
  width: 50px;
  height: 25px;
  border: none;
  outline: none;
  border-radius: 0;
  color: #fff;
  font-size: 12px;
  color: #4a4a4a;
  background-color: rgba(255, 255, 255, 0.1);
}

.confirm button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.confirm button.confirm-btn {
  background-color: var(--backColor);
}

.confirm-enter {
  transform: rotateX(90deg);
}

.confirm-enter-to {
  transform: rotateX(0);
}

.confirm-leave {
  transform: rotateX(0);
}

.confirm-leave-to {
  transform: rotateX(90deg);
}
</style>
