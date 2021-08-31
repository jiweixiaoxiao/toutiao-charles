<template>
  <div class="login-container">
    <van-nav-bar class="page-nav-bar" title="登陆"/>
    <van-form ref="loginForm">
      <van-field
        v-model="user.mobile"
        name="mobile" label="手机号" placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
      <!--      这里放一个插槽-->
      <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        type="number"
        name="code"
        label="验证码"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        maxlength="6"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <van-count-down
          v-if="isCountDownShow"
          slot="button"
          :time="1000 * 5"
          format="ss s"
          @finish="isCountDownShow = false"
        />
        <template #button>
          <!--
            time: 倒计时时间
           -->
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            class="send-sms-btn"
            native-type="button"
            round
            size="small"
            type="default"
            @click="onSendSms"
          >发送验证码</van-button>
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
import { login, getSmsCode } from '@/api/user'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
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
      },
      isCountDownShow: false
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
        // const res = await login(this.user)
        const { data } = await login(this.user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
        // 登录成功，跳转回原来页面
        // back 的方式不严谨，后面讲功能优化的时候再说
        this.$router.back()
      } catch (err) {
        console.log('--------' + this.$store.state.user.token)
        if (err.response.status === 400) {
          console.log('登陆失败', err)
          this.$toast.fail('登录失败，手机号或验证码错误')
        } else {
          this.$toast.fail('登陆失败，请稍后再试')
        }
      }
    },
    async onSendSms () {
      try {
        console.log(this.user.mobile)
        // 这里的mobile对应的是上面表单中mobile行的name="mobile"属性
        await this.$refs.loginForm.validate('mobile')
        // await this.$refs.loginForm.validate('user.mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }

      this.isCountDownShow = true
      try {
        await getSmsCode(this.user.mobile)
      } catch (err) {
        this.isCountDownShow = false
        console.log('---------' + err)
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后再试')
        } else {
          this.$toast('发送失败，请稍后再试')
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

  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
