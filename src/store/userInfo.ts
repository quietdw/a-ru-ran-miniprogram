import { defineStore } from 'pinia'

type UserInfoResponse = Awaited<ReturnType<typeof Apis.general.post_api_wechatuser_login>>
type UserInfoItem = NonNullable<NonNullable<UserInfoResponse['data']>['userinfo']>

interface AddressInfo {
  cityName: string
  countyName: string
  detailInfo: string
  provinceName: string
  telNumber: string
  userName: string
}

export const useUserInfoStore = defineStore('userInfo', {
  state: () => ({
    token: '',
    userinfo: null as UserInfoItem | null,
    addressInfo: null as AddressInfo | null,
  }),

  getters: {
    /** 是否已登录 */
    isLoggedIn: state => !!state.token,
    address: (state) => {
      if (state.addressInfo) {
        return `${state.addressInfo.provinceName} ${state.addressInfo.cityName} ${state.addressInfo.countyName} ${state.addressInfo.detailInfo}`
      }
      return ''
    },
  },

  actions: {
    /** 设置登录 token */
    setToken(token: string) {
      this.token = token
    },

    setUserinfo(userinfo: UserInfoItem | null) {
      this.userinfo = userinfo
    },

    setAddressInfo(addressInfo: AddressInfo | null) {
      this.addressInfo = addressInfo
    },

    /** 退出登录，清空用户信息 */
    logout() {
      this.setUserinfo(null)
      this.setToken('')
      this.setAddressInfo(null)
    },
    // 更新本地用户信息
    async updateUserinfo() {
      const infoRes = await Apis.general.get_api_wechatuser()
      this.setUserinfo(infoRes.data || null)
    },
    // 更新服务器用户信息
    async updateOriginUserinfo(data: Partial<UserInfoItem>) {
      const params = {
        ...this.userinfo,
        ...data,
      }
      const infoRes = await Apis.general.post_api_wechatuser({
        data: params,
      })
      console.log(infoRes)
      // this.setUserinfo(infoRes.data || null)
    },
  },
})
