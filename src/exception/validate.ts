import { BaseException } from './base'
import { RESCODE } from '../enums/global'

/**
 * 核心异常
 */
export class PlusValidateException extends BaseException {
  constructor(msg: string) {
    super('PlusValidateException', RESCODE.VALIDATEFAIL, msg ? msg : 'core fail')
  }
}
