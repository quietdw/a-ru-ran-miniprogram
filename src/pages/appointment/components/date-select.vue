<script setup lang="ts">
import { getWeekLabel } from 'wot-design-uni/components/wd-calendar-view/utils'
import { formatDate } from '@/utils/date'

const selectedDate = ref('')
const selectedTime = ref('')
const selectedRoom = ref('')

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

const timeList = computed(() => {
  return [{
    label: '09:00~10:00',
    value: '09:00~10:00',
  }, {
    label: '10:30~11:30',
    value: '10:30~11:30',
  }, {
    label: '13:00~14:00',
    value: '13:00~14:00',
  }, {
    label: '14:30~15:30',
    value: '14:30~15:30',
  }, {
    label: '16:00~17:00',
    value: '16:00~17:00',
  }, {
    label: '17:30~18:30',
    value: '17:30~18:30',
  }, {
    label: '19:00~20:00',
    value: '19:00~20:00',
  }]
})

const roomList = computed(() => {
  return [{
    label: '1号房',
    value: '1号房',
    checked: false,
  }, {
    label: '2号房',
    value: '2号房',
    checked: false,
  }, {
    label: '3号房',
    value: '3号房',
    checked: false,
  }, {
    label: '4号房',
    value: '4号房',
    checked: true,
  }]
})

function handleDateSelect(date: string) {
  selectedDate.value = date
  selectedTime.value = ''
  selectedRoom.value = ''
}

function handleTimeSelect(time: string) {
  selectedTime.value = time
  selectedRoom.value = ''
}

function handleRoomSelect(room: string) {
  selectedRoom.value = room
}

function handleSubmit() {
  console.log(selectedDate.value, selectedTime.value, selectedRoom.value)
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
  <view class="flex flex-col gap-20rpx">
    <view class="date-select overflow-hidden rounded-32rpx bg-#FFF4F4">
      <scroll-view scroll-x>
        <view class="flex flex-nowrap gap-8rpx">
          <view
            v-for="(item, index) in dateList" :key="item.value" class="date-item flex flex-col items-center px-13rpx py-8rpx"
            :class="{
              'pl-28rpx': index === 0,
              'pr-28rpx': index === dateList.length - 1,
              'bg-#FFE0E0': selectedDate === item.value,
            }"
            @tap="handleDateSelect(item.value)"
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
    <view class="date-time-select mx--20rpx">
      <wd-row :gutter="10">
        <wd-col v-for="item in timeList" :key="item.value" :span="8">
          <view

            class="mb-20rpx rounded-32rpx bg-#F4F4F4 px-11rpx py-8rpx" :class="{
              '!bg-#D4F9D9': selectedTime === item.value,
              '!text-#009F03': selectedTime === item.value,
            }"
            @tap="handleTimeSelect(item.value)"
          >
            <view class="t-s text-center text-#333">
              {{ item.label }}
            </view>
          </view>
        </wd-col>
      </wd-row>
    </view>
    <view class="room-select flex flex-wrap justify-center gap-40rpx">
      <view v-for="item in roomList" :key="item.value">
        <view class="t-xs mb-4rpx text-#666" @tap="!item.checked && handleRoomSelect(item.value)">
          <view v-if="item.value === selectedRoom" class="flex flex-col items-center gap-8rpx">
            <image src="@/static/img/check-success.svg" mode="aspectFill" class="h-60rpx w-60rpx" />
            <view class="t-xs">
              预约
            </view>
            <view class="t-xxs">
              {{ item.label }}
            </view>
          </view>
          <view v-else-if="item.checked" class="flex flex-col items-center gap-8rpx">
            <image src="@/static/img/check-warning.svg" mode="aspectFill" class="h-60rpx w-60rpx" />
            <view class="t-xs">
              已预约
            </view>
            <view class="t-xxs">
              {{ item.label }}
            </view>
          </view>
          <view v-else class="flex flex-col items-center gap-8rpx">
            <image src="@/static/img/check-normal.svg" mode="aspectFill" class="h-60rpx w-60rpx" />
            <view class="t-xs">
              空闲
            </view>
            <view class="t-xxs">
              {{ item.label }}
            </view>
          </view>
        </view>
      </view>
    </view>
    <wd-button :disabled="!selectedDate || !selectedTime || !selectedRoom" block custom-class="!rounded-16rpx !bg-#2D62B8" @tap="handleSubmit">
      立即预约
    </wd-button>
  </view>
</template>

<style lang="scss" scoped>
.date-select {

  .date-item {

  }

}
</style>
