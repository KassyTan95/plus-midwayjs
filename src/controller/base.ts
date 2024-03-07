import { App, IMidwayApplication, Init, Inject, Provide } from '@midwayjs/core'
import { Context } from '@midwayjs/koa'
import * as dayjs from 'dayjs'
import { RESCODE } from '../enums/global'
import type { BaseResponse } from '../interface'

@Provide()
export abstract class BaseController {
  @Inject('ctx')
  protected baseCtx: Context

  @App()
  protected baseApp: IMidwayApplication

  @Init()
  async init() {}

  /**
   * 接口输出格式
   * @param data 数据
   * @param msg 提示信息
   * @param code 状态码
   * @param isShowTime 时间显示
   * @protected
   */
  protected apiResp<D>(data?: D, msg?: string, code?: number, isShowTime = true): BaseResponse<D> {
    const result: BaseResponse<D> = {
      code: code ? code : RESCODE.OK,
      msg: msg ? msg : 'ok'
    }
    if (data) {
      result['data'] = data
    }
    isShowTime && (result['timestamp'] = dayjs().unix())
    return result
  }
}
