<template>
  <div class="nav" :class="{ back: isBack || $store.state.onSetting }">
    <div class="layout">
      <div class="logo">
        <span class="logofont logo-quaint"></span>
        <span>Quaint</span>
      </div>
      <div>
        <div class="nav-items">
          <router-link to="/quaint/home">Home</router-link>
          <router-link to="/quaint/blog">Blog</router-link>
          <router-link to="/login" v-if="!$store.state.token"
            >Login</router-link
          >
          <router-link to="/management/article/chart" v-if="$store.state.token"
            >Admin</router-link
          >
        </div>
        <svg
          class="set"
          :class="{ open: $store.state.onSetting }"
          @click="switchSet"
          viewBox="0 0 100 100"
          width="80"
        >
          <path
            class="line"
            d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20"
          />
          <path class="line" d="m 70,50 h -40" />
          <path
            class="line"
            d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
      isBack: false
    }
  },
  methods: {
    switchSet() {
      this.$store.commit('changeSetting')
    }
  },
  mounted() {
    this.isBack = window.pageYOffset > 200 ? true : false
    window.addEventListener('scroll', e => {
      this.isBack = window.pageYOffset > 200 ? true : false
    })
  }
}
</script>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  color: #fff;
  background-color: transparent;
  transition: 0.4s;
  z-index: 999;
}

.nav::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 0;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
  border-block: 1px solid var(--divider);
  transition: 0.5s;
  z-index: -1;
}

.nav .logo {
  display: flex;
  align-items: center;
  height: 50px;
}

.nav .logo svg {
  width: 36px;
  height: 36px;
  margin-right: 5px;
}

.nav .logofont {
  font-size: 28px;
  margin-right: 5px;
}

.nav a {
  display: inline-block;
  height: 50px;
  line-height: 50px;
  padding: 0 12px;
  color: #fff;
  transition-duration: 0.4s;
}

.nav.back,
.nav.back a {
  color: #4a4a4a;
}

.nav.back .logofont {
  color: var(--color);
}

.nav.back::before {
  height: 48px;
}

.nav .layout {
  position: relative;
  align-items: center;
  padding-top: 0;
  font-size: 18px;
}

.nav > div > div {
  display: flex;
  align-items: center;
}

.nav .router-link-active,
.nav a:hover,
.nav .set:not(.open):hover {
  background-color: rgba(0, 0, 0, 0.08);
}

.nav.back .router-link-active {
  border-color: #4a4a4a;
}

.nav .set {
  width: 40px;
  height: 40px;
  border: none;
  cursor: pointer;
  transition: 0.5s;
}

.nav .set .line {
  fill: none;
  transition: 0.5s;
  stroke: #fff;
  stroke-width: 5.5;
  stroke-linecap: round;
}

.back .set .line {
  stroke: #4a4a4a;
}

.nav .set .line:nth-child(1) {
  stroke-dasharray: 40 121;
}

.nav .set .line:nth-child(3) {
  stroke-dasharray: 40 121;
}

.nav .set.open {
  transform: rotate(45deg);
}

.nav .set.open .line {
  stroke: #4a4a4a;
}

.nav .set.open .line:nth-child(1) {
  stroke-dashoffset: -68px;
}

.nav .set.open .line:nth-child(3) {
  stroke-dashoffset: -68px;
}
</style>
