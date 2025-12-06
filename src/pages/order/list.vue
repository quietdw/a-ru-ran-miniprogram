<script setup lang="ts">
import OrderList from './components/order-list.vue'

definePage({
  name: 'order-list',
  layout: 'default',
  style: {
    navigationBarTitleText: '订单列表',
  },
})

const tabCurrentIndex = ref(0)

// '待支付','已支付','配货中','已发货','配送中','已送达','已完成','已取消','退款中','已退款'
const tabs = ref([
  { text: '待支付', value: '待支付' },
  { text: '已支付', value: '已支付' },
  { text: '配货中', value: '配货中' },
  { text: '已发货', value: '已发货' },
  { text: '配送中', value: '配送中' },
  { text: '已送达', value: '已送达' },
  { text: '已完成', value: '已完成' },
  { text: '已取消', value: '已取消' },
  { text: '退款中', value: '退款中' },
  { text: '已退款', value: '已退款' },
])
</script>

<template>
  <view class="order-list relative">
    <wd-tabs
      v-model="tabCurrentIndex"
      :slidable-num="7" swipeable animated
      sticky
    >
      <block v-for="item in tabs" :key="item.value">
        <wd-tab :title="item.text">
          <view class="content flex flex-col gap-24rpx" :style="{ width: `100vw` }">
            <order-list :type="item.value" />
          </view>
        </wd-tab>
      </block>
    </wd-tabs>
  </view>
</template>

<style lang="scss" scoped></style>
