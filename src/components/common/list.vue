<script setup lang="ts">
import Empty from '@/components/common/empty/index.vue'
import { getLoadMoreState, loadmoreOtp } from '@/utils/component.ts'

const props = defineProps({
  type: {
    type: String,
    default: '',
  },
  apiMethod: {
    type: Function,
    default: () => {},
  },
  active: {
    type: Boolean,
    default: true,
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
  remove,
} = usePagination(
    // Method实例获取函数，接收page和pageSize参数
  (page, pageSize) => {
    return props.apiMethod(page, pageSize)
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

// 处理页面触底加载更多
function handleReachBottom() {
  if (!loading.value && !isLastPage.value) {
    page.value++
  }
}

// 页面生命周期
onReachBottom(() => {
  handleReachBottom()
})

// 下拉刷新
onPullDownRefresh(() => {
  refresh()
  setTimeout(() => {
    uni.stopPullDownRefresh()
  }, 500)
})

defineExpose({
  refresh,
  remove,
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
  <view class="list min-h-100vh flex flex-col gap-28rpx px-24rpx">
    <slot :data="data" />
    <template v-if="!loading && !data?.length ">
      <Empty />
    </template>
    <wd-loadmore
      :state="getLoadMoreState(!!error, loading, isLastPage)"
      v-bind="loadmoreOtp()"
      @reload="refresh"
    />
  </view>
</template>

  <style lang="scss" scoped></style>
