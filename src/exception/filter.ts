import { ILogger, Catch, Logger } from '@midwayjs/core'
import { RESCODE } from '../enums/global'
import * as dayjs from 'dayjs'

@Catch()
export class PlusExceptionFilter {
  @Logger()
  coreLogger: ILogger

  async catch(err) {
    this.coreLogger.error(err)
    return {
      code: err.status || RESCODE.COMMONFAIL,
      msg: err.message.replace(/[" ]/g, ''),
      timestamp: dayjs().unix()
    }
  }
}
