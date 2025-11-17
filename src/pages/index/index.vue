<script setup lang="ts">
import arrCard from './components/arr-card.vue'
import bg2 from '@/static/img/bg2.svg'
import PageBg from '@/components/common/page-bg.vue'

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
    <PageBg />
    <view class="relative px-28rpx pb-28rpx">
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
      <view class="pt-32rpx" />
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
          src: bg2,
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

      <view class="mt-48rpx flex">
        <view class="mr-16rpx h-200rpx w-332rpx shrink-0 overflow-hidden rounded-32rpx">
          <image class="h-full w-full" src="@/static/img/pd1.svg" />
        </view>
        <view>
          <view class="mb-10rpx text-24rpx leading-34rpx">
            鹿血丸蒙医特制配方制作
          </view>
          <view class="text-20rpx leading-28rpx">
            鹿血丸属于传统中药制剂，主要功效是补气养血、温补肾阳、强健筋骨，常用于改善气血亏虚、肾阳不足以及身体虚弱引起的一系列症状。它由鹿血等药材组成，需在中医辨证指导下使用。
          </view>
        </view>
      </view>
      <view>
        <view class="mt-24rpx font-bold">
          主要功效
        </view>
        <view class="mt-16rpx text-24rpx font-bold leading-34rpx">
          补气益血
        </view>
        <view class="mt-16rpx text-24rpx leading-34rpx">
          方中含有人参、黄芪等补气药材，以及当归、地黄、白芍等养血药材，共同改善气血两虚、乏力、心悸、面色苍白或萎黄等症状。
        </view>
      </view>

      <view class="mt-48rpx flex">
        <view class="mr-16rpx h-200rpx w-332rpx shrink-0 overflow-hidden rounded-32rpx">
          <image class="h-full w-full" src="@/static/img/pd2.svg" />
        </view>
        <view>
          <view class="mb-10rpx text-24rpx leading-34rpx">
            鹿血丸蒙医特制配方制作
          </view>
          <view class="text-20rpx leading-28rpx">
            鹿血丸属于传统中药制剂，主要功效是补气养血、温补肾阳、强健筋骨，常用于改善气血亏虚、肾阳不足以及身体虚弱引起的一系列症状。它由鹿血等药材组成，需在中医辨证指导下使用。
          </view>
        </view>
      </view>
      <view>
        <view class="mt-24rpx font-bold">
          主要功效
        </view>
        <view class="mt-16rpx text-24rpx font-bold leading-34rpx">
          补气益血
        </view>
        <view class="mt-16rpx text-24rpx leading-34rpx">
          方中含有人参、黄芪等补气药材，以及当归、地黄、白芍等养血药材，共同改善气血两虚、乏力、心悸、面色苍白或萎黄等症状。
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.page {

}
</style>
