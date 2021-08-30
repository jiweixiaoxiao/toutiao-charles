<template>
  <div class="login-container">
    <van-nav-bar class="page-nav-bar" title="登陆"/>
    <van-form>
      <van-field
        v-model="user.mobile"
        name="用户名" label="手机号" placeholder="请输入手机号"/>
      <!--      这里放一个插槽-->
      <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      <van-field
        v-model="user.code"
        type="password"
        name="验证码"
        label="验证码"
        placeholder="请输入验证码"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-button class="send-sms-btn" round type="default" native-type="submit">发送验证码</van-button>
        </template>
      </van-field>

      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit" @click="onLogin">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '../../api/user'

export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    async onLogin () {
      try {
        const res = await login(this.user)
        console.log('登陆成功', res)
      } catch (err) {
        if (err.response.state === 400) {
          console.log('登陆失败', err)
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 190px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
}
</style>
