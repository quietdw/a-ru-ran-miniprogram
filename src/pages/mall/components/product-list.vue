<script setup lang="ts">
import CommonList from '@/components/common/list.vue'
import ProductItem from '@/components/common/product-item.vue'

type ProductListResponse = Awaited<ReturnType<typeof Apis.general.get_api_product>>
type ProductItemType = NonNullable<NonNullable<ProductListResponse['data']>['list']>[number]

const props = defineProps({
  type: {
    type: String,
    default: '',
  },
})

function apiMethod(page: number, pageSize: number) {
  return Apis.general.get_api_product({
    params: { pageNum: page, pageSize, product_category: props.type },
  })
}
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
  <view class="product-list">
    <CommonList :api-method="apiMethod">
      <template #default="{ data }: { data: ProductItemType[] }">
        <view class="flex flex-col gap-28rpx">
          <ProductItem v-for="item in data" :key="item.id" :item="item" />
        </view>
      </template>
    </CommonList>
  </view>
</template>

<style lang="scss" scoped></style>
