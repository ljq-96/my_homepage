<template>
  <div :class="{ onsearch: isOnSearch }" class="translate">
    <div class="result">
      <div class="phonetic">
        <span v-for="(item, index) in phonetic" :key="index">{{ item }}</span>
      </div>
      <div class="translation">
        <div v-for="(item, index) in translation" :key="index">{{ item }}</div>
      </div>
    </div>
    <div @click="onSearch" :class="{ wait: isWaiting }" class="logofont logo-zhuanhuan"></div>
    <input @click.stop type="text" @keyup.13="search" v-model="words" placeholder="search..." />
    <div class="title">有道の翻译</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOnSearch: false,
      isWaiting: false,
      words: '',
      phonetic: [],
      translation: []
    }
  },

  methods: {
    onSearch() {
      this.isOnSearch = !this.isOnSearch
    },
    search() {
      this.isWaiting = true
      this.$request({
        url: '/translate',
        params: {
          words: this.words
        }
      }).then(res => {
        if (res.code === 200) {
          this.isWaiting = false
          this.phonetic = res.result.phonetic
          this.translation = res.result.translation
        } else {
          this.phonetic = ['服务器忙, 请稍候重试']
        }
      })
    }
  }
}
</script>

<style>
.translate {
  position: relative;
  height: 100%;
  padding: 8px;
  color: #fff;
  background-color: var(--color);
  overflow: hidden;
}

.translate .title {
  position: absolute;
  left: 8px;
  bottom: 5px;
  transition: 0.4s;
}

.translate .logofont {
  font-size: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: 0.4s;
}

.translate input {
  position: absolute;
  left: 50%;
  bottom: -40px;
  width: 244px;
  height: 30px;
  padding: 0 10px;
  transform: translateX(-50%);
  border: none;
  outline: none;
  color: #fff;
  font-family: Ubuntu;
  background-color: rgba(255, 255, 255, 0.2);
  transition: 0.4s;
}

.translate input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.translate.onsearch .title {
  transform: translateY(100px);
}

.translate.onsearch .logofont {
  left: 90%;
  top: 8%;
  transform: scale(0.5) translate(-50%, -50%) rotate(240deg);
  opacity: 0.6;
}

.translate.onsearch input {
  bottom: 8px;
}

.translate .result {
  position: absolute;
  top: 4px;
  right: 8px;
  left: 8px;
  transform: translateX(-100%);
  height: 90px;
  font-size: 12px;
  overflow: auto;
  transition: 0.4s;
}

.translate .result .translation div {
  user-select: text;
}

.translate .result .translation div::selection {
  color: var(--color);
  background-color: #fff;
}

.translate .result span {
  margin-right: 4px;
}

.translate .result::-webkit-scrollbar {
  width: 0;
}

.translate .result:hover::-webkit-scrollbar {
  width: 2px;
}

.translate .result:hover::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 1);
}

.translate.onsearch .result {
  transform: translateX(0);
}

.translate.onsearch .wait {
  animation: waiting 1s infinite linear;
}

@keyframes waiting {
  0% {
    transform: scale(0.7) translate(-50%, -50%) rotate(120deg);
  }

  100% {
    transform: scale(0.7) translate(-50%, -50%) rotate(600deg);
  }
}
</style>
