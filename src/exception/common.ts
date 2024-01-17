import { BaseException } from './base'
import { RESCODE } from '../enums/global'

/**
 * 通用异常
 */
export class PlusCommonException extends BaseException {
  constructor(name: string, code: number, msg: string) {
    super(name ? name : 'PlusCommonException', code? code : RESCODE.COMMONFAIL, msg ? msg : 'common fail')
  }
}
