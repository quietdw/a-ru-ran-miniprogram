<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app'
import UserInfo from './components/user-info.vue'
import HealthMonitoring from './components/health-monitoring.vue'
import MemberInfo from './components/member-info.vue'
import PageBg from '@/components/common/page-bg.vue'
import { getFileUrl } from '@/utils/file'
import { useUserInfoStore } from '@/store/userInfo'
import router from '@/router'

definePage({
  name: 'mine',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '我的',
    navigationStyle: 'custom',

  },
})

onShow(() => {
  useUserInfoStore().updateUserinfo()
})

function handleLogout() {
  useUserInfoStore().logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <view class="relative">
    <PageBg custom-class="opacity-30" gradient-start="#cb4d4d38" />
    <view class="relative pb-24rpx">
      <wd-navbar title="" safe-area-inset-top custom-style="background-color: transparent !important;" :bordered="false">
        <template #capsule>
          <UserInfo />
        </template>
      </wd-navbar>
    </view>
    <view class="relative flex flex-col gap-24rpx px-28rpx pt-12rpx">
      <HealthMonitoring />
      <!-- 入口图片 -->
      <view class="flex items-center justify-center gap-24rpx">
        <view class="entrance-left min-w-0" title="会员档案" @click="router.push({ name: 'member-profile' })">
          <image :src="getFileUrl('/img/entrance2.png')" mode="widthFix" class="w-full" />
        </view>
        <view class="entrance-right min-w-0" title="阿如然">
          <button open-type="contact" hover-class="none" plain class="flex !m-0 !h-auto !w-full !bg-transparent !p-0">
            <image :src="getFileUrl('/img/entrance1.png')" mode="widthFix" class="w-full" />
          </button>
        </view>
      </view>

      <!-- 会员 -->
      <MemberInfo />

      <wd-button type="primary" block custom-class="!bg-#fff  !rounded-16rpx !h-106rpx" @click="handleLogout">
        <text class="t-xl text-#333">
          退出登录
        </text>
      </wd-button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.entrance-left {
  flex: 1;
}

.entrance-right {
  flex: 1.175;
}
</style>
