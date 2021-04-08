<template>
  <transition name="no" :duration="1000">
    <div v-show="visible" class="notice">
      <div class="notice-content" @mouseenter="pause" @mouseleave="start">
        <div class="notice-content-mesg">
          <q-icon v-if="type" :icon="typeIcon"></q-icon>
          <div>
            <h3>{{ title }}</h3>
            <p v-if="message" v-html="message"></p>
          </div>
        </div>
        <div class="icon-close-wrap">
          <q-icon @click.once="remove" icon="close"></q-icon>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import FluentDesign from '@/components/FluentDesign'
import FluentDesignItem from '@/components/FluentDesignItem'
export default {
  components: {
    FluentDesign,
    FluentDesignItem
  },
  props: {
    title: {
      type: String
    },
    message: {
      type: String
    },
    duration: {
      type: Number,
      default: 5000
    },
    type: {
      type: String
    }
  },
  data() {
    return {
      visible: false,
      visibleClass: '',
      timer: null
    }
  },
  computed: {
    typeIcon() {
      const obj = {
        info: 'info-circle',
        success: 'check-circle',
        warning: 'warning-circle',
        error: 'close-circle',
        question: 'question-circle'
      }
      return obj[this.type]
    }
  },
  methods: {
    pause() {
      clearTimeout(this.timer)
    },
    start() {
      this.pause()
      this.timer = setTimeout(() => this.remove(), this.duration)
    },
    remove() {
      this.visible = false
      this.$el.addEventListener('transitionend', this.delEl)
    },
    delEl() {
      this.$el.removeEventListener('transitionend', this.delEl)
      this.posRemove()
    }
  },
  mounted() {
    this.visible = true
    this.start()
  }
}
</script>

<style>
.notice {
  position: fixed;
  right: 10px;
  bottom: 10px;
  width: 300px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  backdrop-filter: blur(5px);
  transition: 0.4s;
  z-index: 999;
}

.notice-content {
  padding: 20px;
}

.notice-content-mesg {
  display: flex;
}

.notice-content-mesg .iconfont {
  margin-right: 5px;
  font-size: 18px;
}

.notice-content h3 {
  padding-right: 20px;
}

.notice-content p {
  margin-top: 10px;
  color: var(--disabled);
  word-break: break-all;
}

.no-enter {
  transform: translateX(260px);
}

.no-enter-to {
  transform: translateX(0);
}

.no-leave {
  transform: translateX(0);
}

.no-leave-to {
  opacity: 0;
  transform: translateY(50%);
}

.icon-close-wrap {
  position: absolute !important;
  right: 15px;
  top: 15px;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
}

.icon-close-wrap:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
