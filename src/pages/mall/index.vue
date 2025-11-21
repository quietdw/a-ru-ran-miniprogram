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

// 搜索组件滚动状态
const scrollTop = ref(0)

// 监听页面滚动
onPageScroll((e) => {
  scrollTop.value = e.scrollTop || 0
})

const systemInfo = uni.getSystemInfoSync()

const offsetTop = computed(() => {
  return (systemInfo.statusBarHeight || 0) + 44
})

const backgroundColor = computed(() => {
  const r = offsetTop.value * 0.5

  const rate = scrollTop.value > r ? 1 : scrollTop.value / r
  return `rgba(248,241,241, ${1 * rate})`
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
      <wd-navbar
        title="商城" safe-area-inset-top fixed :custom-style="`background-color: ${backgroundColor} !important;`" :bordered="false"
      />
      <wd-navbar placeholder safe-area-inset-top :custom-style="`background-color: ${backgroundColor} !important;`" :bordered="false" />
      <view class="mt-24rpx" />
      <view>
        <wd-tabs
          v-model="tabCurrentIndex"
          :slidable-num="7" swipeable animated
          sticky
          :offset-top="offsetTop"
          custom-class="mall-tab"
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

<style lang="scss" scoped>
:deep() {
      .mall-tab {
        &.wd-tabs {
          background: transparent;
        }
        .wd-tabs__nav {
          background: transparent;
        }
        .wd-tabs__nav-container {
          background: v-bind(backgroundColor);
        }
        .wd-tabs__line {
          bottom: 6rpx;
          // background: linear-gradient(180deg, #fbc34d 0%, #fb9556 100%);
        }
        .wd-tabs__nav-item {
          line-height: 44rpx;
          .wd-tabs__nav-item-text {
            font-size: 28rpx;
            color: #333;
          }
          &.is-active {
            .wd-tabs__nav-item-text {
              font-size: 32rpx;
            }
          }
        }
      }

    }
</style>
