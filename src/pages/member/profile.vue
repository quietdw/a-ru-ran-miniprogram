<script setup lang="ts">
import CaseItem from './components/case-item.vue'
import CommonList from '@/components/common/list.vue'
import type { Transformer_casemanagementtransformer as ListItem } from '@/api/globals'

definePage({
  name: 'member-profile',
  layout: 'default',
  style: {
    navigationBarTitleText: '会员档案',
  },
})

const showFirst = ref(false)

const globalToast = useGlobalToast()
const router = useRouter()

function apiMethod() {
  return Apis.general.get_api_case_management({
    params: {
      pageNum: 1,
      pageSize: 10,
    },
  })
}

onLoad((opt) => {
  showFirst.value = !opt?.showAll
})
</script>

<template>
  <view class="bind-device p-24rpx">
    <CommonList :api-method="apiMethod" :show-loadmore="!showFirst">
      <template v-if="showFirst" #header="{ data }: { data: ListItem[] }">
        <view class="flex flex-col">
          <CaseItem :data="data?.[0]" />

          <view class="t-s mt-48rpx flex items-center justify-between">
            <view
              class="underline" @click="router.push({
                name: 'member-profile',
                params: {
                  showAll: '1',
                },
              })"
            >
              历次诊疗效果
            </view>
            <view
              class="underline" @click="router.push({
                name: 'consumption-list',

              })"
            >
              购买记录
            </view>
          </view>
        </view>
      </template>
      <template v-else #default="{ data }: { data: ListItem[] }">
        <div class="flex flex-col gap-24rpx">
          <view v-for="item in (data || [])" :key="item.id" class="arr-card">
            <CaseItem :data="item" />
          </view>
        </div>
      </template>
    </CommonList>
  </view>
</template>

<style lang="scss" scoped></style>
