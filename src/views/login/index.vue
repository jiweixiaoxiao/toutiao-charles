<template>
  <div class="login-container">
    <van-nav-bar class="page-nav-bar" title="登陆"/>
    <van-form>
      <van-field
        v-model="user.mobile"
        name="用户名" label="手机号" placeholder="请输入手机号"
        :rules="userFormRules.mobile"
      />
      <!--      这里放一个插槽-->
      <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      <van-field
        v-model="user.code"
        type="number"
        name="验证码"
        label="验证码"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
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
import { login } from '@/api/user'

export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
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
      // 开始转圈圈
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: '登录中...' // 提示消息
      })
      try {
        const res = await login(this.user)
        console.log('登陆成功', res)
        this.$toast.success('登录成功')
      } catch (err) {
        if (err.response.state === 400) {
          console.log('登陆失败', err)
          this.$toast.fail('登录失败，手机号或验证码错误')
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
