<template>
  <div class="regexp">
    <div class="rule">
      <div class="item">
        <span>正则:</span>/<input @keyup.enter="test" type="text" v-model="reg" spellcheck="false" />/{{ setAttr }}
      </div>
      <div class="item">
        <span>文本:</span><input @keyup.enter="test" type="text" v-model="words" spellcheck="false" />
      </div>
      <label class="item">
        <span>g:</span><input v-model="attributes.g" type="checkbox" />
        <checkbox-svg :state="attributes.g ? 1 : 0" :size="14"></checkbox-svg>
      </label>
      <label class="item">
        <span>i:</span><input v-model="attributes.i" type="checkbox" />
        <checkbox-svg :state="attributes.i ? 1 : 0" :size="14"></checkbox-svg>
      </label>
      <label class="item">
        <span>m:</span><input v-model="attributes.m" type="checkbox" />
        <checkbox-svg :state="attributes.m ? 1 : 0" :size="14"></checkbox-svg>
      </label>
    </div>
    <div class="result">
      <div>共找到{{ result.length }}项匹配</div>
      <div>{{ result.list }}</div>
    </div>
    <div class="collection" :class="{ on: isCollect }">
      <div v-for="(item, index) in collection" :key="index">
        <div>{{ item.des }}</div>
        <div>{{ item.reg }}</div>
        <div class="hr"></div>
      </div>
    </div>
    <div class="title">正则表达式测试</div>
    <q-icon @click="changeCol" :icon="isCollect ? 'close' : 'code'"></q-icon>
  </div>
</template>

<script>
import CheckboxSvg from '@/components/CheckboxSvg'
export default {
  components: {
    CheckboxSvg
  },
  data() {
    return {
      reg: '.o',
      words: 'hello world',
      result: {
        length: 0,
        list: []
      },
      attributes: {
        g: true,
        i: false,
        m: false
      },
      isCollect: false,
      collection: [
        {
          reg: '[\\u4e00-\\u9fa5]',
          des: '中文字符'
        },
        {
          reg: '^((https|http|ftp|rtsp|mms)?:\/\/)[^\\s]+',
          des: '网址URL'
        },
        {
          reg: '\\w[-\\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\\.)+[A-Za-z]{2,14}',
          des: '邮箱'
        },
        {
          reg: '\\d{3}-\\d{8}|\\d{4}-\\{7,8}',
          des: '国内电话号码'
        },
        {
          reg: '^(\\d{6})(\\d{4})(\\d{2})(\\d{2})(\\d{3})([0-9]|X)$',
          des: '身份证号'
        }
      ]
    }
  },
  methods: {
    test() {
      const reg = new RegExp(this.reg, this.setAttr)
      const arr = this.words.match(reg)
      if (arr) {
        this.result.length = arr.length
        this.result.list = arr
      } else {
        this.result.length = 0
        this.result.list.length = 0
      }
    },
    changeCol() {
      this.isCollect = !this.isCollect
    }
  },
  computed: {
    setAttr() {
      let res = ''
      for (let key in this.attributes) {
        if (this.attributes[key]) res += key
      }
      return res
    }
  },
  created() {
    this.test()
  }
}
</script>

<style>
.regexp {
  position: relative;
  height: 100%;
  padding: 8px;
  font-family: FiraCode;
  background-color: var(--color);
  overflow: hidden;
}

.regexp .title {
  position: absolute;
  left: 8px;
  bottom: 5px;
  transition: 0.4s;
}

.regexp .iconfont {
  position: absolute;
  right: 8px;
  bottom: 8px;
  font-size: 26px !important;
  z-index: 100;
}

.regexp .rule {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 50%;
  padding-bottom: 10px;
}

.regexp .item {
  display: flex;
  align-items: center;
}

.regexp .item > span {
  width: 40px;
  text-align-last: justify;
  margin-right: 10px;
}

.regexp .item [type='text'] {
  width: 150px;
  border: none;
  outline: none;
  color: #fff;
  font-family: FiraCode;
  background-color: transparent;
}

.regexp [type='text']:focus {
  background-color: rgba(255, 255, 255, 0.2);
}

.regexp [type='checkbox'] {
  display: none;
}

.regexp .result {
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.regexp .collection {
  position: absolute;
  height: calc(100% - 50px);
  top: 100%;
  left: 8px;
  right: 8px;
  font-size: 12px;
  background-color: var(--color);
  overflow: auto;
  filter: brightness(80%);
  transition: 0.4s;
}

.regexp .collection .hr {
  height: 1px;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 4px 0;
}

.regexp .collection > div div:nth-child(2) {
  user-select: all;
}

.regexp .collection > div div:nth-child(2)::selection {
  color: #4a4a4a;
  background-color: #fff;
}

.regexp .collection.on {
  filter: brightness(100%);
  top: 8px;
}

.regexp .collection::-webkit-scrollbar {
  width: 0;
}

.regexp .collection:hover::-webkit-scrollbar {
  width: 2px;
}

.regexp .collection:hover::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 1);
}
</style>
