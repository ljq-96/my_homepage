<template>
  <div class="footer">
    <div class="layout">
      <div class="logo">
        <logo-svg
          :color1="this.$store.state.color.css()"
          :color2="this.$store.state.color.brighten(1).css()"
        ></logo-svg>
        <p>Quaint</p>
      </div>
      <div class="list" v-for="(group, index) in collection" :key="index">
        <div class="list-title">{{ group.title }}</div>
        <div class="list-content">
          <a
            v-for="item in group.data"
            :key="item.name"
            :href="item.url"
            traget="_blank"
            >{{ item.name }}</a
          >
        </div>
      </div>
      <div class="saying">
        Your progress lives<br />
        where your greatest<br />
        fears lie
      </div>
    </div>
    <div
      @click="top"
      :style="{ bottom: bottom + 'px' }"
      :class="{ onbottom: isBottom }"
      class="totop iconfont icon-caret-top blur"
    ></div>
  </div>
</template>

<script>
import LogoSvg from '@/components/LogoSvg'
export default {
  components: {
    LogoSvg
  },
  data() {
    return {
      collection: [
        {
          title: '文档',
          data: [
            {
              name: 'Vue',
              url: 'https://cn.vuejs.org/v2/guide/'
            },
            {
              name: 'Reace',
              url: 'https://react.docschina.org/docs/getting-started.html'
            },
            {
              name: 'Node',
              url: 'https://www.nodeapp.cn/'
            },
            {
              name: 'express',
              url: 'https://www.expressjs.com.cn/'
            }
          ]
        },
        {
          title: '文档',
          data: [
            {
              name: '阮一峰',
              url: 'http://www.ruanyifeng.com/home.html'
            },
            {
              name: '廖雪峰',
              url: 'https://www.liaoxuefeng.com/'
            },
            {
              name: '张鑫旭',
              url: 'https://www.zhangxinxu.com/'
            }
          ]
        },
        {
          title: '工具',
          data: [
            {
              name: 'PPT模板',
              url: 'http://www.ypppt.com/'
            },
            {
              name: 'JSON格式化',
              url: 'https://www.sojson.com/'
            },
            {
              name: 'HTML转义',
              url: 'https://www.sojson.com/rehtml'
            },
            {
              name: '正则表达式',
              url: 'https://www.sojson.com/regex/generate'
            },
            {
              name: 'KeyCode查询',
              url: 'http://www.bejson.com/othertools/keycodes/'
            }
          ]
        }
      ],
      isBottom: false,
      bottom: -48
    }
  },
  methods: {
    top() {
      window.scrollTo(0, 0)
    }
  },
  mounted() {
    window.addEventListener('scroll', e => {
      if (
        document.documentElement.clientHeight + window.pageYOffset >=
        document.body.scrollHeight - 150
      ) {
        this.isBottom = true
      } else if (window.pageYOffset < 56) {
        this.bottom = window.pageYOffset - 48
      } else {
        this.bottom = 8
        this.isBottom = false
      }
    })
  }
}
</script>

<style>
@media (max-width: 768px) {
  .footer {
    height: 50px;
    text-align: center;
    line-height: 50px;
  }

  .footer::after {
    color: #aaa;
    font-size: 12px;
    content: '——— 靡有不初，鲜有克终，不忘初心，方得始终 ———';
  }

  .footer .totop {
    right: 8px !important;
  }

  .footer .layout {
    display: none;
  }
}

.footer {
  position: relative;
  margin-top: 20px;
  padding-bottom: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
  background-color: #fff;
}

.footer .logo svg {
  width: 70px;
  margin-left: -6px;
  margin-top: -10px;
}

.footer .logo p {
  font-size: 18px;
}

.footer .list-content {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  height: 90px;
}

.footer .list-title {
  margin-bottom: 10px;
}

.footer a {
  color: #7a7a7a;
  font-size: 12px;
  margin-right: 30px;
}

.footer a:hover {
  text-decoration: underline;
  color: var(--color);
}

.footer .saying {
  font-size: 20px;
  font-weight: bold;
  line-height: 2em;
}

.footer .totop {
  position: fixed;
  right: 210px;
  bottom: 8px;
  width: 64px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 24px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
  transition-duration: 0.4s;
  transition-property: width, border-radius, transform;
}

.footer .totop.onbottom {
  position: absolute;
  bottom: 162px !important;
  transform: translateX(-12px);
  width: 40px;
  border-radius: 20px;
}
</style>
