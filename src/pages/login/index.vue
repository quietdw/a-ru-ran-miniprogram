<script setup lang="ts">
import Apis from '@/api'

definePage({
  name: 'login',
  style: {
    navigationBarTitleText: '登录',
  },
})

async function handleGetPhoneNumber(e: { code: string, encryptedData: string, iv: string }) {
  if (e.code) {
  // 小程序登录
    const loginRes = await Apis.general.post_api_wechat_login({
      data: {
        code: e.code,
      },
    })
    console.log(loginRes)

    // 获取手机号
    const phoneRes = await Apis.general.post_api_wechat_getphone({
      data: {
        encrypted_data: e.encryptedData,
        iv: e.iv,
      },
    })
    console.log(phoneRes)
  }
}
</script>

<template>
  <view class="2222">
    <view class="mt-80vh px-20rpx">
      <wd-button
        block
        type="primary"
        open-type="getPhoneNumber"
        custom-class="!rounded-16rpx"
        @getphonenumber="handleGetPhoneNumber"
      >
        微信授权登录
      </wd-button>
    </view>
  </view>
</template>

<style lang="scss" scoped></style>
