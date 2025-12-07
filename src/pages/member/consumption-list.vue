<script setup lang="ts">
import CommonList from '@/components/common/list.vue'

type ListResponse = Awaited<ReturnType<typeof Apis.general.get_api_consumption>>
type ListItem = NonNullable<NonNullable<ListResponse['data']>['list']>[number]

definePage({
  name: 'consumption-list',
  layout: 'default',
  style: {
    navigationBarTitleText: '消费记录',
  },
})

const listRef = ref<InstanceType<typeof CommonList>>()

const globalToast = useGlobalToast()
const globalMessage = useGlobalMessage()

function apiMethod(page: number, pageSize: number) {
  return Apis.general.get_api_consumption({ params: { pageNum: page, pageSize } })
}
</script>

<template>
  <view class="list">
    <CommonList ref="listRef" :api-method="apiMethod">
      <template #default="{ data }: { data: ListItem[] }">
        <view class="flex flex-col gap-24rpx py-24rpx">
          <view v-for="item in data" :key="item.id" class="consumption-item arr-card flex gap-24rpx bg-#fff">
            <!-- 右侧内容区 -->
            <view class="min-w-0 flex flex-1 flex-col justify-between py-8rpx">
              <!-- 顶部：消费项目 -->
              <view class="t-m line-clamp-1 font-bold">
                {{ item.remark }}
              </view>

              <!-- 中间：类型和时间 -->
              <view class="mt-12rpx flex items-center gap-16rpx">
                <view class="type-tag t-xs rounded-8rpx bg-#f5f5f5 px-12rpx py-4rpx text-#666666">
                  {{ item.transaction_type }}
                </view>
                <view class="t-xs text-#999999">
                  {{ item.create_at }}
                </view>
              </view>

              <!-- 底部：金额和余额 -->
              <view class="mt-16rpx flex items-end justify-between">
                <view class="amount flex items-end gap-4rpx">
                  <view class="t-xs text-#FF4444">
                    ¥
                  </view>
                  <view class="t-xl text-#FF4444 font-bold leading-[1.2]">
                    {{ item.amount }}
                  </view>
                </view>
                <view class="balance t-xs text-#999999">
                  余额: ¥{{ item.wallet_balance }}
                </view>
              </view>
            </view>
          </view>
        </view>
      </template>
    </CommonList>
  </view>
</template>

  <style lang="scss" scoped>
.consumption-item {
  transition: all 0.3s ease;

  .icon-wrapper {
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
  }

  .type-tag {
    white-space: nowrap;
  }

}
</style>
