<template>
  <q-form
    class="login-form"
    :model="userInfo"
    :rules="rules"
    labelWidth="50px"
    ref="form"
  >
    <div class="wellcome">
      Wellcome
    </div>
    <q-form-item class="form-item" label="用户名" prop="username">
      <q-input v-model="userInfo.username" type="text" placeholder="username" />
    </q-form-item>
    <q-form-item class="form-item" label="密码" prop="password">
      <q-input
        v-model="userInfo.password"
        type="password"
        placeholder="password"
      />
    </q-form-item>
    <q-form-item class="form-item" label=" ">
      <QButton type="success" @click="login" v-if="isLogin">登录</QButton>
      <QButton type="warning" @click="register" v-if="!isLogin">注册</QButton>
    </q-form-item>
    <q-form-item class="form-item" label=" ">
      <div class="toggle" @click="isLogin = !isLogin">{{ tips }}</div>
    </q-form-item>
  </q-form>
</template>

<script>
import CanvasWallpaper from '@/components/CanvasWallpaper'
import FluentDesign from '@/components/FluentDesign'
import FluentDesignItem from '@/components/FluentDesignItem'
export default {
  components: {
    FluentDesign,
    FluentDesignItem,
    CanvasWallpaper
  },
  data() {
    return {
      userInfo: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '用户名不能为空' }],
        password: [{ required: true, message: '密码不能为空' }]
      },
      isLogin: true
    }
  },
  computed: {
    tips() {
      return this.isLogin ? '没有账号? 点击注册' : '已有账号? 点击登录'
    }
  },
  methods: {
    login() {
      this.$refs.form.validate(flag => {
        if (flag) {
          this.$request({
            url: '/user/login',
            method: 'post',
            data: {
              userName: this.userInfo.username,
              password: this.userInfo.password
            }
          }).then(res => {
            if (res.code === 200) {
              if (res.message === 'success') {
                this.$router.push('/quaint/home')
                this.$store.commit('setToken', res.token)
                this.$notice({
                  type: 'success',
                  title: '登录成功',
                  message: `Enjoy It <i class="iconfont icon-smile"></i>`
                })
              } else {
                this.$notice({
                  type: 'error',
                  title: '登录失败',
                  message: res.message
                })
              }
            }
          })
        }
      })
    },
    register() {
      this.$refs.form.validate(flag => {
        if (flag) {
          this.$request({
            url: '/user/register',
            method: 'post',
            data: {
              userName: this.userInfo.username,
              password: this.userInfo.password
            }
          }).then(res => {
            if (res.code === 200) {
              if (res.message === 'success') {
                this.$router.push('/quaint/home')
                this.$store.commit('setToken', res.token)
              } else {
                this.$notice({
                  type: 'error',
                  title: '注册失败',
                  message: res.message
                })
              }
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.wellcome {
  font-size: 24px;
  text-align: center;
  margin: 20px 0 60px;
}

.login-form {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 20px 40px;
  width: 350px;
  background-color: #fff;
  border-radius: 5px;
  z-index: 10;
}

.login-wallpaper {
  width: 100%;
  height: 100%;
}

.form-item {
  margin: 30px 0;
}

.form-item > div {
  margin-bottom: 10px;
}

.form-item:nth-of-type(4) {
  margin-top: 40px;
}

.login-form .toggle {
  color: #3e62ad;
  cursor: pointer;
}
</style>
