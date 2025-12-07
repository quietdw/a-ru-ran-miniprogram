<script setup lang="ts">
onLaunch(() => {})
</script>

<style lang="scss">
:root,
page{
  --primary-color: #2D62B8;
  --wot-color-theme: var(--primary-color);

  --wot-button-primary-bg-color: var(--primary-color);
  --wot-button-medium-radius: 16rpx;

  .wd-loadmore {

    --wot-loadmore-height:48rpx;
    --wot-loading-size:24rpx;
    --wot-divider-margin:0
  }

}

.page-wraper {
  min-height: calc(100vh - var(--window-top));
  box-sizing: border-box;
  background: #f9f9f9;
  color: #333;
  font-size: 28rpx;
  line-height: 40rpx;

}

.wot-theme-dark.page-wraper {
  background: #222;
}

.custom-link.wd-cell {
  --wot-cell-arrow-color:#1328A4CC;
  --wot-size-side-padding:0;
  background-color: transparent !important;

  .wd-cell__label {
    line-height: 34rpx;
    margin-top: 0;
    color:#1f1f1f
  }
}

button[plain] {
  border: 0
}

.arr-card {
  padding: 32rpx 16rpx;
  box-shadow: 0px 1px 5px 0px #0000001A;
  border-radius: 16rpx;
  position: relative;
  min-height:100rpx;
  box-sizing: border-box;
}

.t-xxs {
  font-size:16rpx;
  line-height: 22rpx;
}

.t-xs {
  font-size:20rpx;
  line-height: 28rpx;
}

.t-s {
  font-size:24rpx;
  line-height: 34rpx;
}
.t-n {
  font-size: 28rpx;
  line-height: 40rpx;
}
.t-l {
  font-size: 32rpx;
  line-height: 44rpx;
}
.t-xl {
  font-size: 36rpx;
  line-height: 50rpx;
}
.t-xxl {
  font-size: 40rpx;
  line-height: 56rpx;
}
</style>
