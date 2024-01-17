import { Inject, Provide } from '@midwayjs/core'
import { Context } from '@midwayjs/koa'
import { TypeORMDataSourceManager } from '@midwayjs/typeorm'
import { PlusEventManager } from '../event'

@Provide()
export abstract class BaseService {
  @Inject('ctx')
  baseCtx: Context

  @Inject()
  typeORMDataSourceManager: TypeORMDataSourceManager

  @Inject()
  plusEventManager: PlusEventManager
}
