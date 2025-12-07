/*
 * @Author: cursor
 * @Date: 2025-12-07
 * @Description: 会员相关接口的mock数据 (消费记录)
 */
import { defineMock } from '@alova/mock'
import { generateMockData } from '../utils/generators'

// 消费类型
const consumptionTypes = [
  { type: 'bath', name: '药浴服务' },
  { type: 'food', name: '餐饮消费' },
  { type: 'goods', name: '商品购买' },
  { type: 'room', name: '住宿费用' },
  { type: 'other', name: '其他消费' },
]

// 具体消费项目
const consumptionItems = [
  '养生药浴套餐A',
  '养生药浴套餐B',
  '私人聚餐',
  '特色养生茶',
  '养生商品礼盒',
  '房间住宿',
  '按摩理疗',
  '足浴套餐',
  '养生餐',
  '保健品',
]

// 病例类型
const caseTypes = [
  '颈椎调理',
  '腰椎养护',
  '失眠调理',
  '消化系统调理',
  '关节疼痛调理',
  '慢性疲劳综合征',
  '神经衰弱调理',
  '肩周炎调理',
  '风湿关节炎调理',
  '高血压调理',
]

// 治疗效果
const treatmentEffects = [
  '显著改善',
  '有所改善',
  '效果良好',
  '效果一般',
  '持续观察中',
  '症状明显缓解',
  '基本恢复',
  '需要继续调理',
]

// 症状描述模板
const symptomTemplates = [
  '患者自述长期工作压力大,出现颈肩酸痛,活动受限。经过初次调理后,疼痛感明显减轻。',
  '患者反映腰部疼痛已有半年,久坐后加重。首次治疗采用中药药浴配合按摩,患者感觉舒适。',
  '患者长期失眠多梦,入睡困难。通过药浴调理和穴位按摩,当晚睡眠质量有所提升。',
  '患者消化不良,胃胀气明显。采用温和药浴和腹部调理,症状得到缓解。',
  '患者膝关节疼痛,上下楼梯困难。首次药浴治疗后,活动灵活度有所提高。',
  '患者长期疲劳乏力,精神不振。经过养生调理,精神状态明显好转。',
  '患者自述头晕耳鸣,注意力不集中。通过综合调理,症状有所改善。',
  '患者肩关节活动受限,抬臂困难。首次治疗后,活动范围扩大。',
  '患者关节红肿疼痛,遇冷加重。药浴治疗后,肿胀减轻,疼痛缓解。',
  '患者血压偏高,伴有头晕头痛。调理后血压趋于平稳,头痛减轻。',
]

// 生成消费记录数据
const consumptions = generateMockData.array((index) => {
  const typeInfo = consumptionTypes[index % consumptionTypes.length]
  const itemName = consumptionItems[index % consumptionItems.length]
  const amount = generateMockData.number(50, 500) // 金额 50-500元
  const currentBalance = generateMockData.number(1000, 5000) // 当前余额 1000-5000元

  return {
    id: index + 1,
    transaction_type: typeInfo.name, // 交易类型
    remark: itemName, // 备注(消费项目)
    amount, // 消费金额
    wallet_balance: currentBalance, // 钱包余额
    create_at: generateMockData.datetime(-generateMockData.number(1, 30)), // 最近30天内的随机时间
  }
}, 15)

// 生成病例管理数据
const caseManagements = generateMockData.array((index) => {
  const caseName = caseTypes[index % caseTypes.length]
  const caseDesc = symptomTemplates[index % symptomTemplates.length]
  const effect = treatmentEffects[index % treatmentEffects.length]
  const userId = generateMockData.number(1, 100) // 用户ID 1-100

  return {
    id: index + 1,
    case_name: caseName, // 病例名称
    case_description: caseDesc, // 病例详情
    first_treatment_effect: effect, // 首次治疗效果
    user_id: userId, // 用户ID
    created_at: generateMockData.datetime(-generateMockData.number(1, 60)), // 最近60天内的随机时间
    userinfo: {
      nick_name: '', //  generateMockData.name('user'),
      mobile: 13333333333,
    }, // 用户信息(简化处理)
  }
}, 20)

export default defineMock({
  // 获取消费记录列表
  '[GET]/api/consumption': ({ query }) => {
    console.log('[Mock] GET /api/consumption', query)

    const { pageNum = 1, pageSize = 10 } = query

    // 分页处理
    const total = consumptions.length
    const start = (Number(pageNum) - 1) * Number(pageSize)
    const end = start + Number(pageSize)
    const list = consumptions.slice(start, end)

    return {
      code: 0,
      msg: '获取成功',
      data: {
        list,
        total,
        page: Number(pageNum),
        pageSize: Number(pageSize),
      },
    }
  },

  // 获取病例管理列表
  '[GET]/api/case_management': ({ query }) => {
    console.log('[Mock] GET /api/case_management', query)

    const { pageNum = 1, pageSize = 10 } = query

    // 分页处理
    const total = caseManagements.length
    const start = (Number(pageNum) - 1) * Number(pageSize)
    const end = start + Number(pageSize)
    const list = caseManagements.slice(start, end)

    return {
      code: 0,
      msg: '获取成功',
      data: {
        list,
        total,
        page: Number(pageNum),
        pageSize: Number(pageSize),
      },
    }
  },
})
