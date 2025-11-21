<script setup lang="ts">
import ProductItem from './product-item.vue'
import Empty from '@/components/common/empty/index.vue'

defineProps({
  value: {
    type: Number,
    default: 0,
  },
})

const list = computed(() => {
  return Array.from({ length: 10 }, (_, index) => {
    return {
      name: `商品${index + 1}`,
      value: index + 1,
    }
  })
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
  <view class="product-list flex flex-col gap-28rpx px-24rpx">
    <ProductItem v-for="item in list" :key="item.value" :item="item" />
  </view>
</template>

<style lang="scss" scoped></style>
