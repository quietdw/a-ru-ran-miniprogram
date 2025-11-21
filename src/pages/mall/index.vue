<script setup lang="ts">
import ProductList from './components/product-list.vue'
import PageBg from '@/components/common/page-bg.vue'

definePage({
  name: 'mall',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '商城',
    navigationStyle: 'custom',

  },
})

const tabCurrentIndex = ref(0)
const tabs = ref([
  { text: '全部', value: 0 },
  { text: '闪送', value: 1 },
])
</script>

<template>
  <view class="relative">
    <PageBg custom-class="opacity-30" gradient-start="#cb4d4d38" />
    <view class="relative pb-28rpx">
      <wd-navbar title="商城" safe-area-inset-top fixed custom-style="background-color: transparent !important;" :bordered="false" />
      <wd-navbar placeholder safe-area-inset-top custom-style="background-color: transparent !important;" :bordered="false" />
      <view class="mt-24rpx" />
      <view>
        <wd-tabs
          v-model="tabCurrentIndex"
          :slidable-num="7" swipeable animated
          sticky
          custom-class="normal-tab"
        >
          <block v-for="item in tabs" :key="item.value">
            <wd-tab :title="item.text">
              <view class="content" :style="{ width: `100vw` }">
                <product-list :value="item.value" />
              </view>
            </wd-tab>
          </block>
        </wd-tabs>
      </view>
    </view>
  </view>
</template>
