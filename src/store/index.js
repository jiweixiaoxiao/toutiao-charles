import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用存储当前登录用户信息（token等数据）
    user: JSON.parse(window.localStorage.getItem('TOUTIAO_USER'))
  },
  // 永远通过mutations来修改user的数据
  mutations: {
    setUser (state, user) {
      state.user = user
      window.localStorage.setItem('TOUTIAO_USER', JSON.stringify(user))
    }
  },
  actions: {
  },
  modules: {
  }
})
