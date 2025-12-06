<script setup lang="ts">
import { getWeekLabel } from 'wot-design-uni/components/wd-calendar-view/utils'
import { formatDate } from '@/utils/date'
import { getFileUrl } from '@/utils/file'
import { useGlobalToast } from '@/composables/useGlobalToast'
import GlobalLoading from '@/components/GlobalLoading.vue'

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
})
const globalLoading = useGlobalLoading()
const globalToast = useGlobalToast()

type RoomListResponse = Awaited<ReturnType<typeof Apis.general.get_api_rooms>>
type RoomItem = NonNullable<NonNullable<RoomListResponse['data']>['list']>[number]

type TimeSlotResponse = Awaited<ReturnType<typeof Apis.general.get_api_reservations_room_roomid>>
type TimeSlotItem = NonNullable<NonNullable<TimeSlotResponse['data']>['availables']>[number]

// 查询房间列表

// 选择的日期
const selectedDate = ref('')
// 选择的时间段
const selectedTimeSlotId = ref<number | undefined>(undefined)
// 选择的房间
const selectedRoomId = ref<number | undefined>(undefined)

// 可预约日期列表
const dateList = computed(() => {
  const today = new Date()
  const count = 30
  const d = []
  for (let i = 0; i < count; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    const week = date.getDay()

    const dateItem = {
      label: i === 0 ? '今天' : `周${getWeekLabel(week)}`,
      value: formatDate(date, 'MM.d'),
      valueStr: formatDate(date, 'yyyy-MM-dd'),
    }
    d.push(dateItem)
  }
  return d
})
// 可选时间列表
const timeList = ref<TimeSlotItem[]>([])
// 可选房间列表
const roomList = ref<RoomItem[]>([])
// 时间id对应可选的房间id
const timeIdToAvailableRoomIdMap = ref<Record<number, number[]>>({})

const availableTimeList = ref<{ roomId: number | undefined, availables: TimeSlotItem[] }[]>([])

function handleDateSelect(date: string) {
  selectedDate.value = date
  selectedTimeSlotId.value = undefined
  selectedRoomId.value = undefined
  initData(date)
}

function handleTimeSelect(timeId: number | undefined) {
  selectedTimeSlotId.value = timeId
  selectedRoomId.value = undefined
}

function handleRoomSelect(roomId: number | undefined) {
  selectedRoomId.value = roomId
}

async function handleSubmit() {
  if (!selectedTimeSlotId.value) {
    return
  }
  globalLoading.loading('预约中...')

  try {
    await Apis.general.post_api_reservations({
      data: {
        date: new Date(selectedDate.value).toISOString(),
        timeSlotId: selectedTimeSlotId.value,
        roomId: selectedRoomId.value,
      },
    })
    globalLoading.close()
    globalToast.success('预约成功')

    selectedRoomId.value = undefined

    // 刷新数据
    updateAvailableTimeList()
  }
  catch (error) {
    globalLoading.close()
    globalToast.error('预约失败')
  }
}

initData(dateList.value[0].valueStr)
async function initData(dateStr: string) {
  timeIdToAvailableRoomIdMap.value = {}
  timeList.value = []
  roomList.value = []
  availableTimeList.value = []

  selectedDate.value = dateStr

  const res = await Apis.general.get_api_rooms({
    params: {
      floorId: props.item.id,
    },
  })

  roomList.value = res?.data?.list || []
  await updateAvailableTimeList()
}

async function updateAvailableTimeList() {
  const res3 = await Promise.all(roomList.value.map(async (item) => {
    const res2 = await Apis.general.get_api_reservations_room_roomid({
      pathParams: { roomId: item.id?.toString() || '' as unknown as string },
      params: { date: selectedDate.value },
    })
    return {
      roomId: item.id,
      availables: res2?.data?.availables || [],
    }
  }))

  availableTimeList.value = res3

  const pushedTimeSlotIdList: number[] = []
  const tList: TimeSlotItem[] = []

  timeIdToAvailableRoomIdMap.value = {}
  availableTimeList.value.forEach((item) => {
    item.availables.forEach((time) => {

      // 添加时间
      if (time.timeSlotId && !pushedTimeSlotIdList.includes(time.timeSlotId)) {
        pushedTimeSlotIdList.push(time.timeSlotId)
        tList.push(time)
      }

      // 添加时间id对应可选的房间id
      if (time.timeSlotId && item.roomId && time.available) {
        timeIdToAvailableRoomIdMap.value[time.timeSlotId] = [...(timeIdToAvailableRoomIdMap.value[time.timeSlotId] || []), item.roomId]
      }
    })
  })
  timeList.value = tList
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
  <view class="min-h-300rpx flex flex-col gap-20rpx">
    <view class="date-select overflow-hidden rounded-32rpx bg-#FFF4F4">
      <scroll-view scroll-x>
        <view class="flex flex-nowrap gap-8rpx">
          <view
            v-for="(item, index) in dateList" :key="item.valueStr" class="date-item flex flex-col items-center px-13rpx py-8rpx"
            :class="{
              'pl-28rpx': index === 0,
              'pr-28rpx': index === dateList.length - 1,
              'bg-#FFE0E0': selectedDate === item.valueStr,
            }"
            @tap="handleDateSelect(item.valueStr)"
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
    <view v-if="selectedDate" class="date-time-select mx--20rpx">
      <wd-row :gutter="10">
        <wd-col v-for="item in timeList" :key="item.timeSlotId" :span="8">
          <view

            class="mb-20rpx rounded-32rpx bg-#F4F4F4 px-11rpx py-8rpx" :class="{
              '!bg-#D4F9D9': selectedTimeSlotId === item.timeSlotId,
              '!text-#009F03': selectedTimeSlotId === item.timeSlotId,

            }"
            @tap="item.available && handleTimeSelect(item.timeSlotId)"
          >
            <view
              class="t-s text-center" :class="{
                '!text-#333': item.available,
                '!text-#999': !item.available,
              }"
            >
              {{ item.label }}
            </view>
          </view>
        </wd-col>
      </wd-row>
    </view>
    <view v-if="selectedTimeSlotId" class="room-select flex flex-wrap justify-center gap-40rpx">
      <view v-for="room in roomList" :key="room.id">
        <view class="t-xs mb-4rpx text-#666">
          <view v-if="room.id && !timeIdToAvailableRoomIdMap[selectedTimeSlotId]?.includes(room.id)" key="1" class="flex flex-col items-center gap-8rpx">
            <image :src="getFileUrl('/img/check-warning.svg')" mode="aspectFill" class="h-60rpx w-60rpx" />
            <view class="t-xs">
              已预约
            </view>
            <view class="t-xxs">
              {{ room.name }}
            </view>
          </view>
          <view v-else-if="room.id === selectedRoomId" key="2" class="flex flex-col items-center gap-8rpx">
            <image :src="getFileUrl('/img/check-success.svg')" mode="aspectFill" class="h-60rpx w-60rpx" />
            <view class="t-xs">
              预约
            </view>
            <view class="t-xxs">
              {{ room.name }}
            </view>
          </view>
          <view v-else key="3" class="flex flex-col items-center gap-8rpx" @click="handleRoomSelect(room.id)">
            <image :src="getFileUrl('/img/check-normal.svg')" mode="aspectFill" class="h-60rpx w-60rpx" />
            <view class="t-xs">
              空闲
            </view>
            <view class="t-xxs">
              {{ room.name }}
            </view>
          </view>
        </view>
      </view>
    </view>
    <wd-button v-if="selectedDate && selectedTimeSlotId && selectedRoomId" block custom-class="!rounded-16rpx !bg-#2D62B8" @tap="handleSubmit">
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
