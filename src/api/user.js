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
