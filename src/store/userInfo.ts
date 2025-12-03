import { defineStore } from 'pinia'

export const useUserInfoStore = defineStore('userInfo', {
  state: () => ({
    token: '',
    userinfo: null,
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

    setUserinfo(userinfo: any) {
      this.userinfo = userinfo
    },

    /** 退出登录，清空用户信息 */
    logout() {
      this.token = ''
      this.userinfo = null
    },
  },
})
