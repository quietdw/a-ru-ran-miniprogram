<script setup lang="ts">
import UserInfo from './components/user-info.vue'
import PageBg from '@/components/common/page-bg.vue'
import { getFileUrl } from '@/utils/file'

definePage({
  name: 'mine',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '我的',
    navigationStyle: 'custom',

  },
})
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
    <view class="mt-24rpx" />
    <view class="px-28rpx">
      2234
    </view>
  </view>
</template>
