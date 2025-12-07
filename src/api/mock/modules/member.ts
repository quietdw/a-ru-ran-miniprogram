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
})
