<script setup lang="ts">
import { useWatcher } from 'alova/client'
import type { Transformer_devicetransformer } from '@/api/globals'
import { getFileUrl } from '@/utils/file'
import Apis from '@/api'
import router from '@/router'

const { userinfo } = storeToRefs(useUserInfoStore())
const globalToast = useGlobalToast()
const deviceId = computed(() => userinfo.value?.default_device_id || 0)
const { data: rawData } = useWatcher(
  () => Apis.device.get_api_device_id(
    {
      pathParams: {
        id: deviceId.value,
      },
    },
  ),
  [deviceId],
  {
    immediate: true,
    middleware: (c, next) => {
      if (!deviceId.value) {
        return
      }
      next()
    },
  },
)

// 使用计算属性进行类型转换
const data = computed(() => rawData.value as { data?: Transformer_devicetransformer, msg?: string } | undefined)

function handleDisconnect() {
  console.log('handleDisconnect')
  globalToast.error('断开连接失败')
}

function handleHealthMonitoring() {
  globalToast.error('健康监测失败')
  console.log('handleHealthMonitoring')
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
  <view class="health-monitoring flex flex-col gap-24rpx">
    <view class="t-n font-bold">
      会员健康监测
    </view>
    <view v-if="deviceId" class="arr-card bg-#fff">
      <view class="flex items-center justify-between">
        我的设备
        <wd-button size="small" custom-class="!h-40rpx rounded-16rpx !bg-#EBEBEB" @click="handleDisconnect">
          <text class="t-s text-#B2B2B2">
            断开连接
          </text>
        </wd-button>
      </view>

      <view class="mt-18rpx flex gap-24rpx">
        <image :src="getFileUrl('/img/device.svg')" class="h-176rpx w-176rpx" />
        <view class="min-w-0 flex flex-1 flex-col gap-24rpx">
          <view class="t-s flex">
            {{ data?.data?.device_name }}
            <wd-icon
              name="arrow-right" custom-class="ml-auto" @click="router.push({
                name: 'bind-device',
                params: {
                  deviceId: String(data?.data?.id || ''),
                },
              })"
            />
          </view>
          <view class="t-s text-#999">
            已同步所有数据
          </view>
          <wd-button size="small" custom-class="!h-50rpx !w-140rpx rounded-16rpx !bg-[var(--primary-color)]" @click="handleHealthMonitoring">
            健康监测
          </wd-button>
        </view>
      </view>
    </view>
    <view v-else class="t-n arr-card bg-#fff text-center text-#999" @click="router.push({ name: 'bind-device' })">
      + 绑定设备
    </view>
  </view>
</template>

<style lang="scss" scoped></style>
