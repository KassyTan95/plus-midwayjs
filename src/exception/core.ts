import { BaseException } from './base'
import { RESCODE } from '../enums/global'

/**
 * 核心异常
 */
export class PlusCoreException extends BaseException {
  constructor(msg: string) {
    super('PlusCoreException', RESCODE.COREFAIL, msg ? msg : 'core fail')
  }
}
