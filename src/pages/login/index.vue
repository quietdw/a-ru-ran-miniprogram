<script setup lang="ts">
import Apis from '@/api'
import { useUserInfoStore } from '@/store/userInfo'
import { useGlobalToast } from '@/composables/useGlobalToast'

definePage({
  name: 'login',
  style: {
    navigationBarTitleText: '登录',
  },
})

const userInfoStore = useUserInfoStore()
const globalToast = useGlobalToast()
async function handleLogin() {
  uni.login({
    provider: 'weixin',
    success: async (e: { code: string }) => {
      const loginRes = await Apis.general.post_api_wechatuser_login({
        data: {
          code: e.code,
        },
      })
      console.log('loginRes', loginRes)
      // 将登录返回的 token 写入用户信息 Store（会自动持久化）
      userInfoStore.setToken(loginRes?.data?.token || '')
      userInfoStore.setUserinfo(loginRes?.data?.userinfo)

      globalToast.success('登录成功')
    },
  })
}
</script>

<template>
  <view class="2222">
    <view class="mt-80vh px-20rpx">
      <wd-button
        block
        type="primary"
        custom-class="!rounded-16rpx"
        @click="handleLogin"
      >
        微信授权登录
      </wd-button>
    </view>
  </view>
</template>

<style lang="scss" scoped></style>
