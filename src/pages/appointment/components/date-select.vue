<script setup lang="ts">
import { getWeekLabel } from 'wot-design-uni/components/wd-calendar-view/utils'
import { formatDate } from '@/utils/date'

const dateList = computed(() => {
  const today = new Date()
  const count = 30
  const dateList = []
  for (let i = 0; i < count; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    const week = date.getDay()

    const dateItem = {
      label: i === 0 ? '今天' : `周${getWeekLabel(week)}`,
      value: formatDate(date, 'MM.d'),
    }
    dateList.push(dateItem)
  }
  return dateList
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
  <view class="date-select overflow-hidden rounded-32rpx bg-#FFF4F4">
    <scroll-view scroll-x>
      <view class="flex flex-nowrap gap-8rpx">
        <view
          v-for="(item, index) in dateList" :key="item.value" class="date-item flex flex-col items-center px-13rpx py-8rpx"
          :class="{
            'pl-28rpx': index === 0,
            'pr-28rpx': index === dateList.length - 1,
            'bg-#FFE0E0': index === 0,
          }"
        >
          <view class="t-xs mb-4rpx text-#666">
            {{ item.label }}
          </view>
          <view class="t-n text-#333 font-bold">
            {{ item.value }}
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
.date-select {

  .date-item {

  }

}
</style>
