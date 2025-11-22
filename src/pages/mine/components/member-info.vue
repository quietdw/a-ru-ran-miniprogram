<script setup lang="ts"></script>

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
</template>

<style lang="scss" scoped>
.member-info {
  border: 1px solid #FCF1E4;
  border-radius: 16rpx;
  padding: 24rpx;
  background: linear-gradient(270.75deg, rgba(251, 235, 218, 0.7) 0%, rgba(253, 247, 239, 0.7) 88.66%);

}
</style>
