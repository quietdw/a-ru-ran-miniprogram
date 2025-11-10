<script>
// 最外层page不能有
export default {
  options: {
    styleIsolation: 'shared', // 将自定义节点设置成虚拟的，更加接近Vue组件的表现，可以去掉微信小程序自定义组件多出的最外层标签
    virtualHost: true, // 在自定义组件中使用 Wot UI 组件时，需开启styleIsolation: 'shared'选项
  },

}
</script>

<script setup>
defineProps({
  customClass: {
    type: String,
  },
  bottomLeft: {
    type: Object,
  },
})
</script>

<template>
  <view class="arr-card" :class="customClass">
    <view class="bottom-left-img" :class="bottomLeft?.class">
      <image v-if="bottomLeft?.src" mode="aspectFill" class="h-full w-full" :src="bottomLeft.src" />
      <image v-else class="h-full w-full" src="@/static/img/cloud2.svg" />
    </view>
    <slot name="left" />
    <view class="content">
      <view class="content-img">
        <image class="h-full w-full" src="@/static/img/cloud3.svg" />
      </view>
      <view>
        <slot />
      </view>
    </view>
    <view class="top-right-img">
      <image class="h-full w-full" src="@/static/img/cloud2.svg" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.arr-card {
    padding: 32rpx 16rpx;
    box-shadow: 0px 1px 5px 0px #0000001A;
    background: #fff;
    border-radius: 16rpx;
    position: relative;
    min-height: 360rpx;
    box-sizing: border-box;
    display: flex;
    align-items:center;

    .top-right-img {
      position: absolute;
      top:4rpx;
      right: 4rpx;
      width: 60rpx;
      height: 60rpx;
      transform: rotate(180deg);

    }

    .bottom-left-img {
      position: absolute;
      left: 4rpx;
      bottom: 4rpx;
      width: 60rpx;
      height: 60rpx;
      z-index: 1;
    }

    .content {
      position: relative;
      flex: 1;
      min-width: 0;
      height: 100%;
      height: 100%;

      .content-img {
        position: absolute;
        width:400rpx;
        height: 400rpx;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);

      }
    }

  }
</style>
