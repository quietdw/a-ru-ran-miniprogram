<script setup lang="ts">
defineProps({
  item: {
    type: Object,
    default: () => ({}),
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
  <view class="product-item arr-card">
    {{ item.name }}
  </view>
</template>

<style lang="scss" scoped></style>
