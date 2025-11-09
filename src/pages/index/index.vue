<script setup lang="ts">
definePage({
  name: 'home',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '阿如然',
    navigationStyle: 'custom',
  },
})
</script>

<template>
  <view class="page relative">
    <view class="bg">
      <image
        class="w-full"
        src="/static/img/bg.svg"
        mode="widthFix"
      />
    </view>
    <view>
      <wd-navbar safe-area-inset-top custom-style="background-color: transparent !important;" :bordered="false">
        <template #capsule>
          <view class="home-title relative flex">
            <view class="absolute left-0 top-0 z-0 h-69rpx w-300rpx">
              <image
                class="h-full w-full"
                src="/static/img/cloud.svg"
                mode="scaleToFill"
              />
            </view>
            <view class="relative pl-72rpx text-32rpx text-white font-bold leading-[70rpx]">
              关于阿如然
            </view>
          </view>
        </template>
      </wd-navbar>
      23456
    </view>
  </view>
</template>

<style lang="scss" scoped>
.page {
  .bg {
    position: absolute;
    width:100%
  }

}
</style>
