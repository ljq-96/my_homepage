<template>
  <form :class="{ sub: isfocus }" :action="address[index].action" id="search" method="GET">
    <input
      @input="search($event)"
      @focus="focus"
      @blur="blur"
      v-model="value"
      type="text"
      placeholder="Search..."
      :name="address[index].name"
      spellcheck="false"
    />
    <button>
      <div class="s-icon"></div>
    </button>
    <div @click="openMenu" class="s-logo iconfont" v-html="address[index].icon"></div>
    <div :class="{ open: isOpen }" class="s-option-box">
      <div v-for="(item, index) in address" class="s-option" :key="item.icon">
        <span class="iconfont" @click="change(index)" v-html="item.icon + item.title"></span>
      </div>
    </div>
    <ul :style="{ height: sugBoxHeight + 'px' }"></ul>
  </form>
</template>

<script>
export default {
  data() {
    return {
      index: 0,
      isOpen: false,
      isfocus: false,
      sugBoxHeight: 0,
      value: '',
      address: [
        {
          action: 'https://www.baidu.com/s?',
          name: 'wd',
          icon: '&#xe660;',
          title: '百度一下'
        },
        {
          action: 'https://www.google.com/search?',
          name: 'q',
          icon: '&#xe9b2;',
          title: '谷歌搜索'
        },
        {
          action: 'https://cn.bing.com/search?',
          name: 'q',
          icon: '&#xe8c9;',
          title: '必应搜索'
        },
        {
          action: 'https://www.zhihu.com/search?',
          name: 'q',
          icon: '&#xe69a;',
          title: '搜知乎'
        },
        {
          action: 'https://www.douban.com/search?',
          name: 'q',
          icon: '&#xe64b;',
          title: '搜豆瓣'
        }
      ]
    }
  },
  mounted() {
    //将Vue方法传到全局对象window中
    window.setSug = this.setSug
  },
  methods: {
    openMenu() {
      this.isOpen = !this.isOpen
    },
    change(index) {
      this.index = index
      this.openMenu()
    },
    focus() {
      this.isfocus = !this.isfocus
      this.search()
    },
    blur() {
      this.isfocus = !this.isfocus
      this.sugBoxHeight = 0
    },
    search() {
      if (this.value) {
        const onScript = document.createElement('script')
        onScript.src = `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${this.value}&cb=setSug`
        document.querySelector('body').appendChild(onScript)
      }
    },
    setSug(data) {
      let str = ''
      const j = data.s.length >= 6 ? 6 : data.s.length
      for (let i = 0; i < j; i++) {
        str += `<li><a href="${this.address[this.index].action}${this.address[this.index].name}=${data.s[i]}">${
          data.s[i]
        }</li>`
        this.sugBoxHeight = j * 30 + 2
        console.log(this.sugBoxHeight)
        document.querySelector('ul').innerHTML = str
      }
    }
  },
  created() {
    window.setSug = this.setSug.bind(this)
  }
}
</script>

<style>
#search {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%);
  border-radius: 4px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
}

#search input {
  width: 448px;
  height: 44px;
  padding: 0 50px 0 44px;
  border: none;
  outline: none;
  font-family: Ubuntu;
  color: #4a4a4a;
  background-color: rgba(0, 0, 0, 0);
  transition: 0.5s;
}

#search.sub input {
  padding-left: 15px;
}

#search .s-logo {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 34px;
  height: 44px;
  font-size: 20px;
  text-align: right;
  line-height: 44px;
  color: #9a9a9a;
  transition: 0.5s;
}

#search.sub .s-logo {
  transform: translate(-34px);
}

#search .s-logo:hover {
  color: var(--color);
}

#search .s-option-box {
  display: flex;
  justify-content: space-between;
  width: 448px;
  height: 0;
  font-size: 12px;
  color: #7a7a7a;
  overflow: hidden;
  transition: 0.5s;
}

#search .s-option-box.open {
  height: 52px;
  padding: 10px 5px;
  border-top: 2px solid var(--color);
}

#search .s-option-box .iconfont {
  margin-right: 4px;
}

#search .s-option {
  padding: 2px;
  height: 30px;
  line-height: 26px;
  background-color: #fff;
}

#search .s-option > p {
  height: 26px;
  padding: 0 10px;
  background-color: #fff;
}

#search .s-option:hover {
  background-color: var(--color);
}

#search .s-option:hover p {
  color: #fff;
  background-color: var(--color);
}

#search button {
  position: absolute;
  top: 0;
  right: 0;
  overflow: hidden;
  width: 48px;
  height: 44px;
  border: none;
  outline: none;
  border-radius: 0;
  background-color: transparent;
  transition: 0.5s;
}

#search .s-icon {
  position: absolute;
  left: 11px;
  top: 11px;
  width: 18px;
  height: 18px;
  border-radius: 9px;
  border: 3px solid #9a9a9a;
  transition: 0.5s;
}

#search .s-icon::after,
#search .s-icon::before {
  content: '';
  position: absolute;
  left: 14px;
  top: 10px;
  width: 3px;
  height: 10px;
  border-radius: 2px;
  background-color: #9a9a9a;
  transform: rotate(-45deg);
  transition: 0.5s;
}

#search.sub button {
  background: var(--color);
}

#search.sub .s-icon {
  top: 20px;
  width: 24px;
  height: 4px;
  border: none;
  background-color: #fff;
  border-radius: 2px;
}

#search.sub .s-icon::before {
  transform: rotate(135deg);
  top: -10px;
  left: 17px;
  height: 14px;
  background-color: #fff;
}

#search.sub .s-icon::after {
  transform: rotate(45deg);
  top: 0;
  left: 17px;
  height: 14px;
  background-color: #fff;
}

#search.sub button:hover .s-icon {
  animation: searchbtn 0.6s;
}

@keyframes searchbtn {
  0% {
    transform: translateX(0);
  }

  50% {
    transform: translateX(40px);
  }

  51% {
    transform: translateX(-40px);
  }

  100% {
    transform: translateX(0);
  }
}

#search ul {
  overflow: hidden;
  transition: 0.5s;
}

#search.sub li:first-child {
  border-top: 2px solid var(--color);
}

#search a {
  display: block;
  height: 30px;
  padding: 0 15px;
  color: #4a4a4a;
  line-height: 30px;
}
</style>
