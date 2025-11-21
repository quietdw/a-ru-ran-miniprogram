<script lang="ts">
import { getFileUrl } from '@/utils/file'

// 最外层page不能有
export default {
  options: {
    styleIsolation: 'shared', // 将自定义节点设置成虚拟的，更加接近Vue组件的表现，可以去掉微信小程序自定义组件多出的最外层标签
    virtualHost: true, // 在自定义组件中使用 Wot UI 组件时，需开启styleIsolation: 'shared'选项
  },

}
</script>

<script setup lang="ts">
defineProps({
  customClass: {
    type: String,
  },

  title: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <view class="arr-card2" :class="customClass">
    <view class="bg1 absolute left-0 top-0" />
    <view class="bg2 absolute bottom-0 right-0 h-full w-full flex items-center justify-center opacity-30">
      <image class="h-400rpx w-400rpx" :src="getFileUrl('/img/cloud3.svg')" />
    </view>
    <view class="content relative z-1 h-full w-full flex flex-col">
      <view v-if="title" class="title t-n mb-20rpx flex items-center justify-center text-#333 font-bold">
        {{ title }}
      </view>
      <view class="content-body">
        <slot />
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.arr-card2 {
    padding: 32rpx 16rpx;
    box-shadow: 0px 1px 5px 0px #0000001A;
    background: #fff;
    border-radius: 16rpx;
    position: relative;
    min-height: 160rpx;
    box-sizing: border-box;
    display: flex;
    align-items:center;

  }
</style>
