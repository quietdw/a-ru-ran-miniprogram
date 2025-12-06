<script setup lang="ts">
import DateSelect from './components/date-select.vue'
import CommonList from '@/components/common/list.vue'
import PageBg from '@/components/common/page-bg.vue'
import ArrCard2 from '@/components/common/arr-card2.vue'
import { getFileUrl } from '@/utils/file'
import Apis from '@/api'

type FloorsListResponse = Awaited<ReturnType<typeof Apis.general.get_api_floors>>
type FloorItemType = NonNullable<NonNullable<FloorsListResponse['data']>['list']>[number]

definePage({
  name: 'appointment',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '预约',
    navigationStyle: 'custom',
  },
})

function apiMethod(page: number, pageSize: number) {
  return Apis.general.get_api_floors({
    params: { pageNum: page, pageSize },
  })
}
</script>

<template>
  <view class="page">
    <PageBg custom-class="opacity-30" gradient-start="#cb4d4d38" />
    <view class="relative px-28rpx pb-28rpx">
      <wd-navbar safe-area-inset-top fixed custom-style="background-color: transparent !important;" :bordered="false">
        <template #capsule>
          <view class="home-title relative flex">
            <view class="absolute left-0rpx top-0 z-0 h-88rpx w-326rpx">
              <image
                class="h-full w-full"
                :src="getFileUrl('/img/cloud4.svg')"
                mode="scaleToFill"
              />
            </view>
            <view class="relative pl-96rpx text-32rpx text-white font-bold leading-[88rpx]">
              会员预约
            </view>
          </view>
        </template>
      </wd-navbar>
      <wd-navbar placeholder safe-area-inset-top custom-style="background-color: transparent !important;" :bordered="false" />

      <view class="pt-32rpx" />
      <CommonList :api-method="apiMethod">
        <template #default="{ data }: { data: FloorItemType[] }">
          <view class="flex flex-col gap-40rpx">
            <ArrCard2 v-for="item in data" :key="item.id" :title="item.name">
              <DateSelect :item="item" />
            </ArrCard2>
          </view>
        </template>
      </CommonList>
    </view>
  </view>
</template>
