<script setup lang="ts">
import Apis from '@/api'
import { useUserInfoStore } from '@/store/userInfo'
import { useGlobalToast } from '@/composables/useGlobalToast'
import router from '@/router'
import { getFileUrl } from '@/utils/file'

definePage({
  name: 'login',
  style: {
    navigationBarTitleText: '登录',
  },
})

const userInfoStore = useUserInfoStore()
const globalToast = useGlobalToast()

async function handleLogin(event1: {
  code: string
  encryptedData: string
  iv: string
}) {
  uni.login({
    provider: 'weixin',
    success: async (event2: { code: string }) => {
      const loginRes = await Apis.general.post_api_wechatuser_login({
        data: {
          code: event2.code,
        },
      })

      // 将登录返回的 token 写入用户信息 Store（会自动持久化）
      userInfoStore.setToken(loginRes?.data?.token || '')
      userInfoStore.setUserinfo(loginRes?.data?.userinfo || null)

      if (!loginRes?.data?.userinfo?.mobile) {
        // 更新手机号
        await Apis.general.post_api_wechatuser_getphone({
          data: {
            encrypted_data: event1.encryptedData,
            iv: event1.iv,
          },
        })
        // 获取用户信息
        const userInfoRes = await Apis.general.get_api_wechatuser()
        userInfoStore.setUserinfo(userInfoRes?.data || null)
      }

      router.back()

      globalToast.success('登录成功')
    },
  })
}
</script>

<template>
  <view class="login-page">
    <!-- <view class="absolute left-0 top-0 w-full flex justify-center pt-100rpx">
      阿如然登录
    </view> -->
    <view class="mt-80vh px-20rpx">
      <wd-button
        block
        type="primary"
        open-type="getPhoneNumber"

        custom-class="!rounded-16rpx"
        @getphonenumber="handleLogin"
      >
        微信授权登录
      </wd-button>
    </view>
  </view>
</template>

<style lang="scss" scoped></style>
