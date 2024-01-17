import { Init, Inject, Provide, Scope, ScopeEnum } from '@midwayjs/core'
import { PlusUrlTagData } from '../tag/data'

@Provide()
@Scope(ScopeEnum.Singleton)
export class PlusDecorator {
  @Inject()
  plusUrlTagData: PlusUrlTagData

  @Init()
  async init() {
    await this.plusUrlTagData.init()
  }
}
