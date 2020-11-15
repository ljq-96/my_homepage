<template>
  <div class="login">
    <q-form class="login-form" :model="userInfo" :rules="rules" labelWidth="50px" ref="form">
      <div class="wellcome">
        Wellcome
      </div>
      <q-form-item class="form-item" label="用户名" prop="username">
        <q-input v-model="userInfo.username" type="text" placeholder="username" />
      </q-form-item>
      <q-form-item class="form-item" label="密码" prop="password">
        <q-input v-model="userInfo.password" type="password" placeholder="password" />
      </q-form-item>
      <q-form-item class="form-item">
        <button @click="login" v-if="isLogin">登录</button>
        <button @click="register" v-if="!isLogin">注册</button>
      </q-form-item>
      <div class="form-bottom">
        <div class="toggle" @click="isLogin = !isLogin">{{ tips }}</div>
      </div>
    </q-form>
    <canvas-wallpaper class="login-wallpaper"></canvas-wallpaper>
  </div>
</template>

<script>
import QForm from '@/components/form/QForm'
import QFormItem from '@/components/form/QFormItem'
import QInput from '@/components/form/QInput'
import CanvasWallpaper from '@/components/CanvasWallpaper'
import FluentDesign from '@/components/FluentDesign'
import FluentDesignItem from '@/components/FluentDesignItem'
export default {
  components: {
    FluentDesign,
    FluentDesignItem,
    CanvasWallpaper,
    QForm,
    QFormItem,
    QInput
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
                this.$router.push('/home')
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
                this.$router.push('/home')
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
.login {
  position: relative;
  height: calc(100vh - 80px);
  margin: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.wellcome {
  font-size: 24px;
  text-align: center;
  margin: 20px 0 60px;
}

.login-form {
  position: absolute;
  padding: 20px 40px;
  width: 400px;
  right: 0;
  top: 0;
  bottom: -1px;
  z-index: 10;
  backdrop-filter: blur(5px);
  background-color: rgba(240, 240, 240, 0.8);
  box-shadow: -5px 0 5px rgba(0, 0, 0, 0.1);
}

.login .login-form input {
  border-color: rgba(0, 0, 0, 0.4);
}

.login-wallpaper {
  width: 100%;
  height: 100%;
}

.form-item {
  margin: 20px 0;
}

.form-item > div {
  margin-bottom: 10px;
}

.form-item:nth-of-type(4) {
  margin-top: 40px;
}

.login input,
.login button {
  width: 100%;
  height: 40px;
  background-color: transparent;
  padding: 0 10px;
  /* border: 2px solid rgba(0, 0, 0, 0.1); */
  border: none;
  border-radius: 0;
  background-color: #f5f5f5;
  outline: none;
  font-family: FiraCode;
}

.login input {
  border-left: 2px solid var(--color);
}

.login button {
  color: #fff;
  background-color: var(--color);
}

.login .form-bottom {
  display: flex;
  justify-content: space-between;
  color: #d84315;
}

.login .toggle {
  color: #3e62ad;
  cursor: pointer;
}
</style>
