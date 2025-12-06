<script setup lang="ts">
import DateSelect from './components/date-select.vue'
import PageBg from '@/components/common/page-bg.vue'
import ArrCard2 from '@/components/common/arr-card2.vue'
import { getFileUrl } from '@/utils/file'
import Apis from '@/api'

definePage({
  name: 'appointment',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '预约',
    navigationStyle: 'custom',
  },
})

// 使用 Alova 的 usePagination hook 管理产品列表请求 https://alova.js.org/zh-CN/tutorial/client/strategy/use-pagination/
const {
  // 加载状态
  loading,
  // 列表数据
  data,
  // 是否为最后一页
  isLastPage,
  // 当前页码
  page,
  // 每页数据条数
  pageSize,
  // 分页页数
  pageCount,
  // 总数据量
  total,
  // 错误状态
  error,
  refresh, // 刷新指定页码数据，此函数将忽略缓存强制发送请求，append 模式下可传入列表项表示刷新此列表项所在的页数
  reload, // 清空数据，并重新请求第一页数据
  send, // 发送请求
} = usePagination(
  // Method实例获取函数，接收page和pageSize参数
  (page, pageSize) => {
    return Apis.general.get_api_floors({
      params: { pageNum: page, pageSize },
    })
  },
  {
    // 指定 total 和 data 回调函数，确保 isLastPage 正确计算
    data: (res) => {
      return res?.data?.list || []
    },
    total: (res) => {
      return res?.data?.total || 0
    },
    // 请求前的初始数据（接口返回的数据格式）
    initialData: {
      list: [],
      total: 0,
    },
    initialPage: 1, // 初始页码，默认为1
    initialPageSize: 10, // 初始每页数据条数，默认为10
    debounce: 300,
    append: true, // 开启追加模式，用于无限滚动
    immediate: true, // 立即执行
  },
)
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
      <view class="flex flex-col gap-40rpx">
        <ArrCard2 v-for="item in data" :key="item.id" :title="item.name">
          <DateSelect :item="item" />
        </ArrCard2>
      </view>
    </view>
  </view>
</template>
