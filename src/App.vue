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
}
</style>
