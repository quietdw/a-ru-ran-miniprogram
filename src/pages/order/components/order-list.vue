<script setup lang="ts">
import CommonList from '@/components/common/list.vue'
import ProductItem from '@/components/common/product-item.vue'

type OrderListResponse = Awaited<ReturnType<typeof Apis.order.get_api_order>>
  type OrderItem = NonNullable<NonNullable<OrderListResponse['data']>['list']>[number]

const props = defineProps({
  type: {
    type: String,
    default: '',
  },
})

const listRef = ref<InstanceType<typeof CommonList>>()

const globalToast = useGlobalToast()
const globalMessage = useGlobalMessage()

function apiMethod(page: number, pageSize: number) {
  return Apis.order.get_api_order({ params: { pageNum: page, pageSize, order_status: props.type } })
}

function handleCancelOrder(item: OrderItem) {
  globalMessage.confirm({
    title: '确认取消订单？',
    success: async () => {
      await Apis.order.put_api_order_close_id({ pathParams: { id: item.id as number } })
      globalToast.success('取消订单成功')
      listRef.value?.remove(item)
    },
  })
}

function handleRefundOrder(item: OrderItem) {
  globalMessage.confirm({
    title: '确认退款？',
    success: async () => {
      await Apis.order.put_api_order_refund_id({ pathParams: { id: item.id as number } })
      globalToast.success('退款成功')
      listRef.value?.remove(item)
    },
  })
}
</script>

<template>
  <view class="order-list">
    <CommonList ref="listRef" :api-method="apiMethod">
      <template #default="{ data }: { data: OrderItem[] }">
        <view class="flex flex-col gap-24rpx">
          <view v-for="item in data" :key="item.id">
            <ProductItem :item="item.product" :show-buy="false">
              <template #header>
                <view class="flex justify-between">
                  <view>
                    {{ item.order_number }}
                  </view>
                  <view class="font-bold">
                    {{ item.order_status }}
                  </view>
                </view>
              </template>
              <template #footer>
                <view class="flex justify-end">
                  <wd-button v-if="item.order_status && ['已支付', '配货中', '已发货', '配送中', '已送达', '已完成'].includes(item.order_status)" size="small" type="primary" @click="handleRefundOrder(item)">
                    极速退款
                  </wd-button>
                  <wd-button v-if="item.order_status && ['待支付'].includes(item.order_status)" size="small" type="primary" @click="handleCancelOrder(item)">
                    取消订单
                  </wd-button>
                </view>
              </template>
            </ProductItem>
          </view>
        </view>
      </template>
    </CommonList>
  </view>
</template>

<style lang="scss" scoped></style>
