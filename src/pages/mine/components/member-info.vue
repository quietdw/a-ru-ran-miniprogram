<script setup lang="ts">
import router from '@/router'

const { userinfo } = storeToRefs(useUserInfoStore())

// 会员卡等级0无会员 1体验会员 2 vip会员 3 银卡会员 4金卡会员 5钻石会员
const vipName = computed(() => {
  const vipNameMap = {
    0: '无会员',
    1: '体验会员',
    2: 'VIP会员',
    3: '银卡会员',
    4: '金卡会员',
    5: '钻石会员',
  }
  return vipNameMap[userinfo?.value?.vip_level as keyof typeof vipNameMap] || '无会员'
})

function toConsumptionList() {
  router.push({
    name: 'consumption-list',
  })
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
  <view class="member-info">
    <view class="flex">
      <view class="t-n text-#946950 font-bold">
        VIP会员
      </view>

      <view class="t-n ml-auto text-#784427 font-bold">
        会员中心
        <wd-icon name="arrow-right" size="28rpx" color="#784427" custom-class="ml-20rpx" />
      </view>
    </view>
    <view v-if="!userinfo?.vip_level">
      <view class="t-n mt-8rpx text-#94684E">
        充值或累积消费3千入门
      </view>
      <view class="mt-36rpx flex justify-between gap-46rpx px-20rpx">
        <view class="t-xl text-#662B0B">
          全场95折
        </view>
        <view class="t-xl text-#E93E3E">
          药浴体验1次
        </view>
        <view class="t-xl text-#E93E3E">
          康养咨询
        </view>
      </view>
      <view class="t-s mt-32rpx text-#662B0BE0 font-bold">
        远程问诊，节令日小礼品赠送，有机火锅同城送餐
      </view>
    </view>
    <view v-else>
      <view>{{ vipName }}</view>
      <view class="mt-36rpx flex justify-between gap-46rpx px-20rpx">
        <view class="flex items-center gap-10rpx">
          <view class="t-n text-#662B0B">
            余额：
          </view>
          <view class="t-xxl text-#E93E3E">
            {{ userinfo?.wallet_balance }}
          </view>
        </view>
        <view class="t-xl text-#662B0B">
          全场95折
        </view>
        <view class="t-xl text-#E93E3E">
          康养咨询
        </view>
      </view>
      <view class="mt-36rpx flex justify-between gap-46rpx font-bold">
        <view class="t-s text-#662B0BE0">
          升级会员卡等级，享更多优惠
        </view>
        <view class="t-s text-#662B0BE0 underline" @click="toConsumptionList">
          消费记录
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.member-info {
  border: 1px solid #FCF1E4;
  border-radius: 16rpx;
  padding: 24rpx;
  background: linear-gradient(270.75deg, rgba(251, 235, 218, 0.7) 0%, rgba(253, 247, 239, 0.7) 88.66%);

}
</style>
