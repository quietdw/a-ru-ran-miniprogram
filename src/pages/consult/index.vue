<script setup lang="ts">
import PageBg from '@/components/common/page-bg.vue'
import arrCard from '@/components/common/arr-card.vue'

definePage({
  name: 'consult',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '咨询',
    navigationStyle: 'custom',

  },
})
</script>

<template>
  <view class="relative">
    <PageBg custom-class="opacity-30" />
    <view class="relative px-28rpx pb-24rpx">
      <wd-navbar title="咨询" safe-area-inset-top custom-style="background-color: transparent !important;" :bordered="false" />
      <view class="mt-24rpx" />
      <arrCard :show-corner-pic="false">
        <view class="mb-16rpx font-bold">
          常见问题
        </view>
        <wd-cell title="1、鹿血丸的作用功效" custom-class=" custom-link" is-link />
        <wd-cell title="2、如何预约项目" custom-class=" custom-link" is-link border />
        <wd-cell title-width="500rpx" title="3、什么时候有时间可以预约" custom-class=" custom-link" is-link border />
      </arrCard>
    </view>
  </view>
</template>

<style lang="scss"></style>
