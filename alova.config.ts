/* eslint-disable no-irregular-whitespace */

import type { Config } from '@alova/wormhole'

// For more config detailed visit:
// https://alova.js.org/tutorial/getting-started/extension-integration

/**
 * Infer OpenAPI schema type from a value
 */
function inferTypeFromValue(value: any): any {
  if (value === null || value === undefined) {
    return { type: 'object' }
  }

  const valueType = typeof value

  if (valueType === 'string') {
    return { type: 'string' }
  }

  if (valueType === 'number') {
    return Number.isInteger(value) ? { type: 'integer' } : { type: 'number' }
  }

  if (valueType === 'boolean') {
    return { type: 'boolean' }
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return { type: 'array', items: { type: 'object' } }
    }
    return {
      type: 'array',
      items: inferTypeFromValue(value[0]),
    }
  }

  if (valueType === 'object') {
    const properties: any = {}
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        properties[key] = inferTypeFromValue(value[key])
      }
    }
    return {
      type: 'object',
      properties,
    }
  }

  return { type: 'object' }
}

/**
 * Create standard response structure from response example data
 */
function createResponseFromData(responseExample: any) {
  const dataSchema = inferTypeFromValue(responseExample.data)

  return {
    allOf: [
      { type: 'object' },
      {
        type: 'object',
        properties: {
          code: { type: 'integer' },
          data: dataSchema,
          msg: { type: 'string' },
        },
      },
    ],
  }
}

export default <Config>{
  generator: [
    {
      /**
       * file input. support:
       * 1. openapi json file url
       * 2. local file
       */
      input: 'http://47.111.80.123:7888/swagger/doc.json',
      /**
       * input file platform. Currently only swagger is supported.
       * When this parameter is specified, the input field only needs to specify the document address without specifying the openapi file
       */
      platform: 'swagger',

      /**
       * output path of interface file and type file.
       * Multiple generators cannot have the same address, otherwise the generated code will overwrite each other.
       */
      output: 'src/api',

      /**
       * the mediaType of the generated response data. default is `application/json`
       */
      responseMediaType: 'application/json',

      /**
       * the bodyMediaType of the generated request body data. default is `application/json`
       */
      bodyMediaType: 'application/json',

      /**
       * the generated api version. options are `2` or `3`, default is `auto`.
       */
      version: 3,

      /**
       * type of generated code. The options ​​are `auto/ts/typescript/module/commonjs`.
       */
      type: 'typescript',

      /**
       * exported global api name, you can access the generated api globally through this name, default is `Apis`.
       * it is required when multiple generators are configured, and it cannot be repeated
       */
      global: 'Apis',

      /**
       * filter or convert the generated api information, return an apiDescriptor, if this function is not specified, the apiDescripor object is not converted
       */
      handleApi: (apiDescriptor) => {
        // Filter out any deprecated APIs if needed
        if (apiDescriptor.deprecated) {
          return undefined // Skip this API
        }

        // Fix login API response type - backend Swagger incorrectly defines it as string
        // but it actually returns a unified response structure like other APIs
        if (apiDescriptor.operationId === 'post_api_wechatuser_login') {
          apiDescriptor.responses = createResponseFromData({
            code: 0,
            data: {
              token: 'string_token',
              userinfo: {
                ID: 6,
                CreatedAt: '2025-12-03T18:50:58.559+08:00',
                UpdatedAt: '2025-12-03T19:00:49.888+08:00',
                open_id: 'of2xy1_fjEzbL0nsZ9qWjFeDr-Cg',
                nick_name: null,
                mobile: null,
                real_name: null,
                id_card: null,
                id_card_front: null,
                id_car_back: null,
                default_device_id: 0,
                encryption_key: null,
                session_key: '+2EkEWcs70Ih/8t9Cirttg==',
                avatar_url: '',
                gender: 0,
                status: '1',
                vip_card: null,
                vip_level: 0,
                points: 0,
                wallet_balance: '0',
                total_recharge: '0',
                total_consumption: '0',
                bath_count: 0,
                CreatedBy: 0,
                UpdatedBy: 0,
                DeletedBy: 0,
              },
            },
            msg: '成功',
          })
        }

        // Fix floors API
        if (apiDescriptor.operationId === 'get_api_floors') {
          apiDescriptor.responses = createResponseFromData(
            {
              code: 0,
              data: {
                list: [
                  {
                    id: 1,
                    name: '药浴预约',
                  },
                  {
                    id: 2,
                    name: '私人聚餐',
                  },
                ],
                total: 2,
                page: 0,
                pageSize: 0,
              },
              msg: '获取成功',
            },
          )
        }

        // Fix rooms API
        if (apiDescriptor.operationId === 'get_api_rooms') {
          apiDescriptor.responses = createResponseFromData({
            code: 0,
            data: {
              list: [
                {
                  id: 1,
                  floorId: 1,
                  name: '1号房间',
                },
              ],
              total: 5,
              page: 0,
              pageSize: 0,
            },
            msg: '获取成功',
          })
        }

        // Fix available timeslots API
        if (apiDescriptor.operationId === 'get_api_reservations_room_roomid') {
          apiDescriptor.responses = createResponseFromData({
            code: 0,
            data: {
              availables: [
                {
                  timeSlotId: 1,
                  label: '9:00-10:00',
                  startTime: '09:00:58',
                  endTime: '10:00:00',
                  available: true,
                },
              ],
              date: '2025-12-05',
              roomId: 1,
            },
            msg: '成功',
          })
        }

        // get_api_product
        if (apiDescriptor.operationId === 'get_api_product') {
          apiDescriptor.responses = createResponseFromData({
            code: 0,
            data: {
              list: [
                {
                  id: 1,
                  product_name: '测试商品',
                  net_weight: '100',
                  shelfLife: '12',
                  origin: '杭州',
                  sales_count: 1000,
                  selling_price: '10',
                  original_price: '100',
                  product_category: '普通商品',
                  image: 'https://t9.baidu.com/it/u=4009945415,82950995&fm=3035&app=3035&size=r2,1&q=75&n=0&g=3n&f=JPEG&fmt=auto&maxorilen2heic=2000000?s=F0082FF000052EFC26B0AF140300C0E2',
                },
              ],
              total: 1,
              page: 0,
              pageSize: 0,
            },
            msg: '获取成功',
          })
        }

        // post_api_order
        if (apiDescriptor.operationId === 'post_api_order') {
          apiDescriptor.responses = createResponseFromData({ code: 0, data: { id: 12, product_id: 1, user_id: 6, order_amount: '10', user_phone: '020-81167888', delivery_address: '广东省 广州市 海珠区 新港中路397号', receiver_name: '张三', expected_delivery_time: '', actual_delivery_time: '', delivery_note: '', order_status: '待支付', order_number: '1997257908554829824', created_at: '2025-12-06 18:52:47', product: { id: 0, product_name: '', net_weight: 100, shelfLife: null, origin: null, sales_count: 100, selling_price: 100, original_price: 100, product_category: '', image: '' } }, msg: '成功' })
        }
        // post_api_wechatuser_login
        if (apiDescriptor.operationId === 'post_api_wechatuser_login') {
          apiDescriptor.responses = createResponseFromData({
            code: 0,
            data: {
              token: '..cabcBAoldpYM82roeuNmqS-9q0_siKMIQx2VXCnmJTk',
              userinfo: { id: 6, nick_name: null, mobile: null, real_name: null, id_card: null, id_card_front: null, id_car_back: null, default_device_id: 0, avatar_url: '', gender: 0, status: '1', vip_card: null, vip_level: 0, points: 0, wallet_balance: '0', total_recharge: '0', total_consumption: '0', bath_count: 0 },
            },
            msg: '成功',
          })
        }
        // get_api_wechatuser
        if (apiDescriptor.operationId === 'get_api_wechatuser') {
          apiDescriptor.responses = createResponseFromData({
            code: 0,
            data: { id: 6, nick_name: null, mobile: null, real_name: null, id_card: null, id_card_front: null, id_car_back: null, default_device_id: 0, avatar_url: '', gender: 0, status: '1', vip_card: null, vip_level: 0, points: 0, wallet_balance: '0', total_recharge: '0', total_consumption: '0', bath_count: 0 },
            msg: '成功',
          })
        }

        // console.log(apiDescriptor)
        return apiDescriptor
      },
    },
  ],

  /**
   * extension only
   * whether to automatically update the interface, enabled by default, check every 5 minutes, closed when set to `false`
   */
  autoUpdate: {
    // Update when editor is launched
    launchEditor: true,
    // Check for updates every 5 minutes
    interval: 5 * 60 * 1000,
  },
}
