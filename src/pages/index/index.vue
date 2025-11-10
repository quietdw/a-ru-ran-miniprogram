<script setup lang="ts">
import arrCard from './components/arr-card.vue'
import bg1 from '@/static/img/pd1.svg'

definePage({
  name: 'home',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '阿如然',
    navigationStyle: 'custom',
  },
})
</script>

<template>
  <view class="page relative">
    <view class="bg">
      <image
        class="w-full"
        src="/static/img/bg.svg"
        mode="widthFix"
      />
    </view>
    <view class="relative px-28rpx">
      <wd-navbar safe-area-inset-top custom-style="background-color: transparent !important;" :bordered="false">
        <template #capsule>
          <view class="home-title relative flex">
            <view class="absolute left-0 top-0 z-0 h-69rpx w-300rpx">
              <image
                class="h-full w-full"
                src="/static/img/cloud.svg"
                mode="scaleToFill"
              />
            </view>
            <view class="relative pl-72rpx text-32rpx text-white font-bold leading-[70rpx]">
              关于阿如然
            </view>
          </view>
        </template>
      </wd-navbar>
      <arr-card>
        <view class="mb-16rpx font-bold">
          蒙医文化
        </view>
        蒙医，又名蒙医学，是蒙古人长期同疾患作斗争的
        <text class="decoration-underline">
          经验总结
        </text>
        ，并吸收中医、藏医经验逐渐形成的医学。蒙古医学有多种
        <text class="decoration-underline">
          诊断方法
        </text>
        和治疗方法。
        <text class="decoration-underline">
          蒙药
        </text>
        与中药相似，以草药为主，是多种草药研成药末制成的。治病多用成药，并总结出饮食疗、炙疗、罨疗、
        <text class="decoration-underline">
          瑟博素疗
        </text>
        、
        <text class="decoration-underline">
          皮疗
        </text>
        、温泉疗、
        <text class="decoration-underline">
          针刺
        </text>
        放血疗、按摩疗等方法。
      </arr-card>
      <arr-card
        custom-class="mt-40rpx" :bottom-left="{
          class: '!w-full !h-117rpx !left-0 !bottom-0',
          src: bg1,
        }"
      >
        <template #left>
          <image class="ml-2rpx mr-8rpx h-376rpx w-224rpx translate-y--52rpx" src="@/static/img/p1.svg" />
        </template>

        <view class="pb-42rpx text-20rpx leading-28rpx">
          <view class="font-bold">
            赤峰市医药卫生学会蒙医药分会第四届常务理事蒙医主任医师，本科学历。生于传统蒙医家庭，1992年8月参加工作。民革党员政协翁牛特旗第十三届、十四届、十五届委员，十四届、十五届常委
          </view>
          <view>
            擅长诊治肝胆胃肠道疾病(如急慢性肝炎、肝硬化肝包虫、胆囊炎、胆石症、胆息肉、胃炎、胃溃疡、急慢性肠炎)、心脑血管疾病、肾病肾炎、肾结石、妇科疾病(如带下、月经不调、功能性出血、痛经、不孕不育)、中风后遗症、风湿腰腿疼、骨质增生、皮肤病、鼻炎、失眠及各种疑难杂症等，具有丰富的临床经验和显著的疗效,
          </view>
        </view>
      </arr-card>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.page {
  .bg {
    position: absolute;
    width:100%
  }

}
</style>
