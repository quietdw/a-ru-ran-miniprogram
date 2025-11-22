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
  customClass: String,
  gradientStart: {
    type: String,
    default: 'rgba(78, 162, 204, 0.2)',
  },
})
</script>

<template>
  <view class="bg" :class="customClass">
    <image
      class="w-full"
      :src="getFileUrl('/img/bg.svg')"
      mode="widthFix"
    />
    <view class="gradient" />
  </view>
</template>

<style lang="scss" scoped>
 .bg {
    position: fixed;
    width:100%;
    pointer-events: none;

    .gradient {
      position: absolute;
      width:100%;
      height: 100%;
      top: 0;
      left:0;

      background: linear-gradient(180deg, v-bind(gradientStart) 0%, rgba(255, 255, 255, 1) 100%);
    }

  }
</style>
