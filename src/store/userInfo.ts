import { defineStore } from 'pinia'
import type { Miniprogram_wechatuser } from '@/api/globals'

export const useUserInfoStore = defineStore('userInfo', {
  state: () => ({
    token: '',
    userinfo: null as Miniprogram_wechatuser | null,
    address: '',
  }),

  getters: {
    /** 是否已登录 */
    isLoggedIn: state => !!state.token,
  },

  actions: {
    /** 设置登录 token */
    setToken(token: string) {
      this.token = token
    },

    setUserinfo(userinfo: Miniprogram_wechatuser | null) {
      this.userinfo = userinfo
    },

    setAddress(address: string) {
      this.address = address
    },

    /** 退出登录，清空用户信息 */
    logout() {
      this.setUserinfo(null)
      this.setToken('')
      this.setAddress('')
    },
  },
})
