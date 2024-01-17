import * as Events from 'events'
import { App, getClassMetadata, Init, listModule, Provide, Scope, ScopeEnum, IMidwayApplication } from '@midwayjs/core'
import { PLUS_CLS_EVENT_KEY, PLUS_EVENT_KEY } from '../decorator/event'

@Provide()
@Scope(ScopeEnum.Singleton)
export class PlusEventManager extends Events {
  @App()
  app: IMidwayApplication

  @Init()
  async init() {
    const eventModules = listModule(PLUS_CLS_EVENT_KEY)
    for (const module of eventModules) {
      this.handlerEvent(module)
    }
  }

  async handlerEvent(module) {
    const events = getClassMetadata(PLUS_EVENT_KEY, module)
    for (const event of events) {
      const method = event.eventName ? event.eventName : event.propertyKey
      this.on(method, async (...args) => {
        const moduleInstance = await this.app.getApplicationContext().getAsync(module)
        moduleInstance[event.propertyKey](...args)
      })
    }
  }
}
