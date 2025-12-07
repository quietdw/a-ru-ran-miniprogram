<script setup lang="ts">
import { useUserInfoStore } from '@/store/userInfo'
import { useGlobalToast } from '@/composables/useGlobalToast'
import router from '@/router'

type ProductListResponse = Awaited<ReturnType<typeof Apis.general.get_api_product>>
type ProductItem = NonNullable<NonNullable<ProductListResponse['data']>['list']>[number]

const props = withDefaults(defineProps<{
  item: ProductItem
  showBuy: boolean
}>(), {
  item: () => ({}),
  showBuy: true,
})

const globalToast = useGlobalToast()
const { address, addressInfo } = storeToRefs(useUserInfoStore())
const globalLoading = useGlobalLoading()

const priceArray = computed(() => {
  return props.item.selling_price?.toString().split('.') || []
})

const salesCount = computed(() => {
  if (props.item.sales_count && props.item.sales_count < 10000) {
    return props.item.sales_count
  }
  return `${(props.item.sales_count || 0 / 10000).toFixed(1)}万+`
})

async function handleBuy() {
  globalLoading.loading('正在生成订单...')
  try {
    const addressInfo = useUserInfoStore().addressInfo

    if (!props.item?.id) {
      return
    }
    const res = await Apis.order.post_api_order({
      data: {
        delivery_address: address.value,
        delivery_note: undefined,
        product_id: props.item?.id,
        receiver_name: addressInfo?.userName || '',
        user_phone: addressInfo?.telNumber || '',
      },
    })

    const orderId = res.data?.id
    if (!orderId) {
      return
    }
    const payRes = await Apis.order.post_api_order_pay_id({
      pathParams: {
        id: orderId,
      },
    })

    const payInfo = payRes.data || {}

    wx.requestPayment({
      timeStamp: payInfo?.timeStamp || '',
      nonceStr: payInfo?.nonceStr || '',
      package: payInfo?.package || '',
      signType: payInfo?.signType as 'MD5' | 'HMAC-SHA256' | 'RSA' | undefined,
      paySign: payInfo?.paySign || '',
      success: () => {
        globalLoading.close()
        globalToast.success('支付成功')
        router.push({ name: 'order-list' })
      },
      fail: () => {
        globalLoading.close()
        globalToast.error('支付失败')
      },
    })
  }
  catch (error) {
    globalLoading.close()
  }
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
  <view class="product-item arr-card flex flex-col gap-20rpx bg-#fff">
    <slot name="header" />
    <view class="flex gap-20rpx">
      <view class="h-200rpx w-200rpx overflow-hidden rounded-16rpx bg-#f5f5f5">
        <image class="h-full w-full" mode="center" :src="getFileUrl(item.image || '')" />
      </view>
      <view class="min-w-0 flex flex-1 flex-col">
        <!-- 名称 -->
        <view class="name t-s">
          {{ item.product_name }}
        </view>
        <!-- 属性 -->
        <view class="attributes t-n mt-20rpx flex items-center gap-24rpx">
          <view class="flex flex-col gap-4rpx text-center">
            <view class="t-xs">
              {{ item.net_weight }}g
            </view>
            <view class="t-xs text-#666666">
              净含量
            </view>
          </view>
          <view class="divider" />
          <view class="flex flex-col gap-4rpx text-center">
            <view class="t-xs">
              {{ item.shelfLife }}个月
            </view>
            <view class="t-xs text-#666666">
              保质期
            </view>
          </view>
          <view class="divider" />

          <view class="flex flex-col gap-4rpx text-center">
            <view class="t-xs">
              {{ item.origin }}
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
                已售 {{ salesCount }}
              </view>
            <!-- <view class="t-xs text-#FF5400">
              本店热销榜第2名
            </view> -->
            </view>
            <!-- 价格 -->
            <view class="price mt-16rpx min-w-0 flex flex-1 gap-8rpx">
              <view class="price-num flex items-end">
                <view class="t-xs text-#FF4444">
                  ¥
                </view>
                <view class="t-l mt-0.25em text-#FF4444 font-bold leading-[38rpx]">
                  {{ priceArray[0] }}
                </view>
                <text v-if="priceArray[1]" class="t-xs text-#FF4444 font-bold">
                  .{{ priceArray[1] }}
                </text>
              </view>
              <view class="original-price flex items-end gap-8rpx">
                <view class="t-xs text-#999">
                  ¥ {{ item.original_price }}
                </view>
              </view>
            </view>
          </view>

          <view v-if="showBuy" class="flex self-end">
            <wd-button
              size="small"
              custom-class="!rounded-16rpx !bg-[var(--primary-color)]"
              @tap="handleBuy"
            >
              立即购买
            </wd-button>
          </view>
        </view>
      </view>
    </view>
    <slot name="footer" />
  </view>
</template>

<style lang="scss" scoped>
.divider {
  width: 1rpx;
  height: 32rpx;
  background: #CCCCCC;
}
</style>
