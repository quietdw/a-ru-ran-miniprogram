<script setup lang="ts">
import PageBg from '@/components/common/page-bg.vue'

definePage({
  name: 'mall',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '商城',
    navigationStyle: 'custom',

  },
})
</script>

<template>
  <view class="relative">
    <PageBg custom-class="opacity-30" gradient-start="#cb4d4d38" />
    <view class="relative px-28rpx pb-28rpx">
      <wd-navbar title="商城" safe-area-inset-top custom-style="background-color: transparent !important;" :bordered="false" />
      <view class="mt-24rpx" />
      <view>
        1234 商城
      </view>
    </view>
  </view>
</template>
