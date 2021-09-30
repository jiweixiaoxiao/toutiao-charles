import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)
const TOKEN_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    // 用存储当前登录用户信息（token等数据）
    // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
    user: getItem(TOKEN_KEY)
  },
  // 永远通过mutations来修改user的数据
  mutations: {
    setUser (state, user) {
      state.user = user
      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(user))
      setItem(TOKEN_KEY, JSON.stringify(user))
    }
  },
  actions: {
  },
  modules: {
  }
})
