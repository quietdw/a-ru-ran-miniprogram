<script setup lang="ts">
definePage({
  name: 'bind-device',
  layout: 'default',
  style: {
    navigationBarTitleText: '绑定设备',
  },
})

const globalToast = useGlobalToast()
const router = useRouter()
const form = ref()
const model = reactive({
  device_code: '',
  device_name: '',
})

function handleSubmit() {
  form.value?.validate().then(async ({ valid }: { valid: boolean }) => {
    if (valid) {
      const res = await Apis.device.post_api_device({
        data: model,
      })

      globalToast.success({ msg: res?.msg || '绑定设备成功' })
      router.back()
    }
  })
}
</script>

<template>
  <view class="bind-device p-24rpx">
    <wd-form ref="form" :model="model">
      <wd-cell-group border>
        <wd-input
          v-model="model.device_code"
          label="设备编号"
          label-width="100px"
          prop="device_code"
          clearable
          placeholder="请输入设备编号"
          :rules="[{ required: true, message: '请填写设备编号' }]"
        />
        <wd-input
          v-model="model.device_name"
          label="设备名称"
          label-width="100px"
          prop="device_name"
          clearable
          placeholder="请输入设备名称"
          :rules="[{ required: true, message: '请填写设备名称' }]"
        />
      </wd-cell-group>
      <view class="footer p-24rpx">
        <wd-button type="primary" size="large" block @click="handleSubmit">
          绑定设备
        </wd-button>
      </view>
    </wd-form>
  </view>
</template>

<style lang="scss" scoped></style>
