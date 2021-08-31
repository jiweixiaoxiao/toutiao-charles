/**
 * 用户相关请求模块
 */

import request from '@/utils/request'

/**
 * 用户登陆
 * 万能验证码
 * 13911111111
 * 验证码： 246810
 */
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

export const getSmsCode = mobile => {
  return request({
    method: 'GET',
    // eslint-disable-next-line no-template-curly-in-string
    url: `/app/v1_0/sms/codes/${mobile}`
    // http://ttapi.research.itcast.cn/app/v1_0/sms/codes
  })
}

/**
 * 获取用户自己的信息
 */
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
    // 发送请求头数据
    // headers: {
    //   // 注意：该接口需要授权才能访问
    //   //       token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
