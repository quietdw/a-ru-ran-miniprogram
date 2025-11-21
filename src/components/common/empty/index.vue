<script setup lang="ts">
import { getFileUrl } from '@/utils/file'

defineProps({
  text: {
    type: String,
    default: '暂无数据',
  },
})
</script>

<script lang="ts">
// 最外层page不能有
export default {
  options: {
    styleIsolation: 'shared', // 将自定义节点设置成虚拟的，更加接近Vue组件的表现，可以去掉微信小程序自定义组件多出的最外层标签
    virtualHost: true, // 在自定义组件中使用 Wot UI 组件时，需开启styleIsolation: 'shared'选项
  },
}
</script>

<template>
  <view class="empty flex flex-col items-center justify-center">
    <image
      class="my-12rpx h-320rpx w-320rpx"
      :src="getFileUrl('/img/menggubao.svg')"
    />
    <view class="text-center text-28rpx text-#999">
      {{ text }}
    </view>
  </view>
</template>

<style lang="scss" scoped>
  .empty {
    padding: 20rpx;
  }
</style>
