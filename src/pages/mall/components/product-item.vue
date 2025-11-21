<script setup lang="ts">
const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
})

const { show: showToast } = useGlobalToast()

const priceArray = computed(() => {
  console.log(props.item.price?.toString())
  return props.item.price?.toString().split('.')
})

function handleBuy() {
  showToast('敬请期待')
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
  <view class="product-item arr-card flex gap-20rpx bg-#fff">
    <view class="h-200rpx w-200rpx overflow-hidden rounded-16rpx bg-#f5f5f5">
      <image class="h-full w-full" mode="center" :src="getFileUrl('/img/test-product.svg')" />
    </view>
    <view class="min-w-0 flex flex-1 flex-col">
      <!-- 名称 -->
      <view class="name t-s">
        {{ item.name }}
      </view>
      <!-- 属性 -->
      <view class="attributes t-n mt-20rpx flex items-center gap-24rpx">
        <view class="flex flex-col gap-4rpx text-center">
          <view class="t-xs">
            500g
          </view>
          <view class="t-xs text-#666666">
            净含量
          </view>
        </view>
        <view class="divider" />
        <view class="flex flex-col gap-4rpx text-center">
          <view class="t-xs">
            12个月
          </view>
          <view class="t-xs text-#666666">
            保质期
          </view>
        </view>
        <view class="divider" />

        <view class="flex flex-col gap-4rpx text-center">
          <view class="t-xs">
            内蒙古
          </view>
          <view class="t-xs text-#666666">
            产地
          </view>
        </view>
      </view>

      <view class="mt-12rpx flex">
        <view class="flex flex-1 flex-col">
          <!-- 已售 -->
          <view class="flex gap-12rpx">
            <view class="t-xs">
              已售 1万+
            </view>
            <view class="t-xs text-#FF5400">
              本店热销榜第2名
            </view>
          </view>
          <!-- 价格 -->
          <view class="price mt-16rpx min-w-0 flex flex-1 items-center gap-8rpx">
            <view class="price-num">
              <text class="t-xs text-#FF4444">
                ¥
              </text>
              <text class="t-l text-#FF4444 font-bold">
                {{ priceArray[0] }}
              </text>
              <text v-if="priceArray[1]" class="t-xs text-#FF4444 font-bold">
                .{{ priceArray[1] }}
              </text>
            </view>
            <view class="original-price flex gap-8rpx">
              <text class="t-xs text-#999999">
                ¥
              </text>
              <text class="t-xs text-#999">
                {{ item.originalPrice }}
              </text>
            </view>
          </view>
        </view>

        <view class="flex self-end">
          <wd-button
            size="small"
            custom-class="!rounded-16rpx !bg-#2D62B8"
            @tap="handleBuy"
          >
            立即购买
          </wd-button>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.divider {
  width: 1rpx;
  height: 32rpx;
  background: #CCCCCC;
}
</style>
