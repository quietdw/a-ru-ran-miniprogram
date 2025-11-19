<script setup lang="ts">
import DateSelect from './components/date-select.vue'
import PageBg from '@/components/common/page-bg.vue'
import ArrCard2 from '@/components/common/arr-card2.vue'

definePage({
  name: 'appointment',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '预约',
    navigationStyle: 'custom',
  },
})
</script>

<template>
  <view class="page">
    <PageBg custom-class="opacity-30" gradient-start="#cb4d4d38" />
    <view class="relative px-28rpx pb-28rpx">
      <wd-navbar safe-area-inset-top custom-style="background-color: transparent !important;" :bordered="false">
        <template #capsule>
          <view class="home-title relative flex">
            <view class="absolute left-0rpx top-0 z-0 h-88rpx w-326rpx">
              <image
                class="h-full w-full"
                src="/static/img/cloud4.svg"
                mode="scaleToFill"
              />
            </view>
            <view class="relative pl-96rpx text-32rpx text-white font-bold leading-[88rpx]">
              会员预约
            </view>
          </view>
        </template>
      </wd-navbar>
      <view class="pt-32rpx" />
      <view>
        <ArrCard2 title="预约药浴">
          <DateSelect />
        </ArrCard2>
        <view class="h-40rpx" />
        <ArrCard2 title="私人聚餐">
          <DateSelect />
        </ArrCard2>
      </view>
    </view>
  </view>
</template>
