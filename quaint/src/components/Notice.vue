<template>
  <transition name="no" :duration="1000">
    <fluent-design
      v-slot="param"
      :borderSize="200"
      :backSize="160"
      :backColor="'rgba(0, 0, 0, 0.05)'"
      :borderColor="'rgba(0, 0, 0, 0.2)'"
      :width="2"
      v-show="visible"
      class="notice"
    >
      <fluent-design-item :param="param" :isRotate="false">
        <div class="notice-content" @mouseenter="pause" @mouseleave="start">
          <div class="notice-content-mesg">
            <i v-if="type" class="iconfont" :class="typeIcon"></i>
            <div>
              <h3>{{ title }}</h3>
              <p v-if="message" v-html="message"></p>
            </div>
          </div>
          <fluent-design-item :param="param" class="icon-close-wrap">
            <i @click.once="remove" class="iconfont icon-close"></i>
          </fluent-design-item>
        </div>
      </fluent-design-item>
    </fluent-design>
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
        info: 'icon-info-circle',
        success: 'icon-check-circle',
        warning: 'icon-warning-circle',
        error: 'icon-close-circle',
        question: 'icon-question-circle'
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
  color: #4a4a4a;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid var(--divider);
  border-radius: 4px;
  backdrop-filter: blur(10px);
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
  color: #7a7a7a;
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
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
