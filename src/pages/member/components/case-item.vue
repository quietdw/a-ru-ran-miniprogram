<script setup lang="ts">
import type { Transformer_casemanagementtransformer as ListItem } from '@/api/globals'

defineProps<{
  data: ListItem
}>()

function getUserInfo(data: ListItem) {
  return data?.userinfo
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
  <view class="flex flex-col gap-24rpx">
    <view class="flex flex-wrap items-center justify-between">
      <view class="t-s flex">
        姓名：<view class="t-n">
          {{ getUserInfo(data)?.nick_name || getUserInfo(data)?.mobile }}
        </view>
      </view>
      <view class="t-xs flex text-#666666">
        首次问诊时间：<view>{{ data?.created_at }}</view>
      </view>
    </view>

    <view class="t-s">
      病例：{{ data?.case_name }}
    </view>
    <view class="t-s">
      {{ data?.case_description }}
    </view>
  </view>
</template>

<style lang="scss" scoped></style>
