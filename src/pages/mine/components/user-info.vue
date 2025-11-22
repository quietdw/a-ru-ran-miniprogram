<script setup lang="ts">
import { CommonUtil } from 'wot-design-uni'
import { storeToRefs } from 'pinia'

const { addUnit } = CommonUtil

const menuButtonInfo = uni.getMenuButtonBoundingClientRect?.()
const menuWidth = addUnit(menuButtonInfo?.width || 0)
</script>

<script lang="ts">
export default {
  options: {
    styleIsolation: 'shared', // 将自定义节点设置成虚拟的，更加接近Vue组件的表现，可以去掉微信小程序自定义组件多出的最外层标签
    virtualHost: true, // 在自定义组件中使用 Wot UI 组件时，需开启styleIsolation: 'shared'选项
  },
}
</script>

<template>
  <view class="user-info-container min-w-0 flex gap-16rpx">
    <view class="user-info-avatar">
      <image
        :src="
          getFileUrl('/img/default-avatar.png')
        "
        class="h-full w-full"
        mode="aspectFill"
      />
    </view>
    <view class="user-info min-w-0 flex flex-1 flex-col">
      <view class="user-info-name flex flex-col justify-start">
        <view class="t-l text-left font-bold">
          游客
        </view>
        <view class="t-s text-left">
          13333333333
        </view>
      </view>
      <view class="user-info-actions" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
  .user-info-container {
    display: flex;
    align-items: center;
    justify-content: space-between;

  }

  .user-info-avatar {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    overflow: hidden;
    border: 1rpx solid #d9d9d9;
  }

  .user-info-actions {
    padding-right: v-bind(menuWidth);

  }
</style>
