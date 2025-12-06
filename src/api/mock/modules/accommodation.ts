/*
 * @Author: cursor
 * @Date: 2025-12-04
 * @Description: 住宿/设施相关接口的mock数据 (楼层、房间)
 */
import { defineMock } from '@alova/mock'
import { generateMockData } from '../utils/generators'

// 固定楼层数据 (模拟业务分类)
const floors = [
  { id: 1, name: '药浴预约' },
  { id: 2, name: '私人聚餐' },
]

// 生成房间数据
const rooms = generateMockData.array(index => ({
  id: index + 1,
  floorId: 1,
  name: `${index + 1}号房间`,
}), 5)

export default defineMock({
  // 获取楼层列表
  '[GET]/api/floors': ({ query }) => {
    console.log('[Mock] GET /api/floors', query)

    return {
      code: 0,
      msg: '获取成功',
      data: {
        list: floors,
        total: floors.length,
        page: 0,
        pageSize: 0,
      },
    }
  },

  // 获取房间列表
  '[GET]/api/rooms': ({ query }) => {
    console.log('[Mock] GET /api/rooms', query)

    // 简单过滤
    let filteredRooms = rooms
    if (query.floorId) {
      filteredRooms = filteredRooms.filter(r => r.floorId === Number(query.floorId))
    }

    return {
      code: 0,
      msg: '获取成功',
      data: {
        list: filteredRooms,
        total: filteredRooms.length,
        page: 0,
        pageSize: 0,
      },
    }
  },
})
