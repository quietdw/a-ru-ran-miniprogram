<script setup lang="ts">
onLaunch(() => {})
</script>

<style lang="scss">
.page-wraper {
  min-height: calc(100vh - var(--window-top));
  box-sizing: border-box;
  background: #f9f9f9;
  color: #363636;
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
</style>
