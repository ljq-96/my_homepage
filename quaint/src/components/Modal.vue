<template>
  <div>
    <transition name="confirm-wrap">
      <div
        v-show="value && visible"
        @click.stop="cancel"
        @mousewheel.prevent
        class="confirm-wrap"
      ></div>
    </transition>
    <transition name="confirm">
      <div v-show="value && visible" class="confirm">
        <div class="confirm-title">{{ title }}</div>
        <div class="confirm-content">
          <slot v-show="message">
            <span>{{ message }}</span>
          </slot>
        </div>
        <div class="confirm-footer">
          <slot name="footer">
            <div class="btn-group">
              <q-button plain @click="cancel">取消</q-button>
              <q-button class="confirm-btn" @click="confirm">
                确定
              </q-button>
            </div>
          </slot>
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
    },
    value: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      visible: false,
      tFn: null,
      fFn: null,
      isRemoveEl: this.value
    }
  },
  methods: {
    confirm() {
      this.tFn && this.tFn()
      this.$emit('confirm')
      this.remove()
    },
    cancel() {
      this.fFn && this.fFn()
      this.$emit('cancel')
      this.remove()
    },
    remove() {
      this.visible = false
      this.$emit('input', false)
      if (this.isRemoveEl) {
        this.$el.addEventListener('transitionend', this.removeEl)
      }
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
  },
  watch: {
    value(newValue) {
      if (newValue) {
        this.visible = true
      }
    }
  },
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
  position: fixed;
  width: 300px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -100%);
  background-color: #fff;
  border-radius: 4px;
  transition: 0.4s;
  z-index: 1000;
}

.confirm .confirm-title {
  font-weight: bold;
  padding: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.confirm .confirm-content {
  padding: 15px;
}

.confirm .q-button {
  margin-left: 10px;
}

.confirm .btn-group {
  text-align: right;
}

.confirm-footer {
  padding: 0 15px 15px;
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
