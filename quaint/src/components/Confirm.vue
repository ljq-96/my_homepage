<template>
  <div>
    <transition name="confirm-wrap">
      <div
        v-show="visible"
        @click.stop="cancel"
        @mousewheel.prevent
        class="confirm-wrap"
      ></div>
    </transition>
    <transition name="confirm">
      <div v-show="visible" class="confirm">
        <div class="confirm-title">{{ title }}</div>
        <div class="confirm-content" v-show="message">{{ message }}</div>
        <div class="btn-group">
          <q-button plain @click="cancel">取消</q-button>
          <q-button class="confirm-btn" @click="confirm">
            确定
          </q-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '警告'
    },
    message: {
      type: String
    }
  },
  data() {
    return {
      visible: false,
      tFn: null,
      fFn: null
    }
  },
  methods: {
    confirm() {
      this.tFn && this.tFn()
      this.remove()
    },
    cancel() {
      this.fFn && this.fFn()
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
    },
    then(fn) {
      this.tFn = fn
      return this
    },
    catch(fn) {
      this.fFn = fn
      return this
    }
  },
  mounted() {
    this.visible = true
  }
}
</script>

<style scoped>
.confirm-wrap {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
  transition: 0.4s;
}

.confirm {
  position: absolute;
  width: 300px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -100%);
  background-color: rgba(255,255,255,0.8);
  backdrop-filter: blur(10px);
  border-radius: 4px;
  transition: 0.4s;
  z-index: 1000;
}

.confirm .confirm-title {
  font-weight: bold;
  padding: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.confirm .confirm-content {
  padding: 10px;
}

.confirm .q-button {
  margin-left: 10px;
}

.confirm .btn-group {
  padding: 10px;
  text-align: right;
}

.confirm-enter {
  opacity: 0;
  transform: translate(-50%, -150%);
}

.confirm-enter-to {
  opacity: 1;
  transform: translate(-50%, -100%);
}

.confirm-leave {
  opacity: 1;
  transform: translate(-50%, -100%);
}

.confirm-leave-to {
  opacity: 0;
  transform: translate(-50%, -150%);
}

.confirm-wrap-enter {
  opacity: 0;
}

.confirm-wrap-enter-to {
  opacity: 1;
}

.confirm-wrap-leave {
  opacity: 1;
}

.confirm-wrap-leave-to {
  opacity: 0;
}
</style>
