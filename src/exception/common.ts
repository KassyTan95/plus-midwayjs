import { BaseException } from './base'
import { RESCODE } from '../enums/global'

/**
 * 通用异常
 */
export class PlusCommonException extends BaseException {
  constructor(msg?: string, code?: number, name?: string) {
    super(name ? name : 'PlusCommonException', code ? code : RESCODE.COMMONFAIL, msg ? msg : 'common fail')
  }
}
