import { saveClassMetadata, saveModule, Scope, ScopeEnum, attachClassMetadata } from '@midwayjs/core'

export const PLUS_CLS_EVENT_KEY = 'decorator:plus:cls:event'

export function PlusEvent(): ClassDecorator {
  return (target: any) => {
    // 将装饰的类，绑定到该装饰器，用于后续能获取到 class
    saveModule(PLUS_CLS_EVENT_KEY, target)
    // 保存一些元数据信息，任意你希望存的东西
    saveClassMetadata(PLUS_CLS_EVENT_KEY, {}, target)
    // 指定 IoC 容器创建实例的作用域，这里注册为请求作用域，这样能取到 ctx
    Scope(ScopeEnum.Singleton)(target)
  }
}

export const PLUS_EVENT_KEY = 'decorator:plus:event'

/**
 * 事件
 * @param eventName
 * @constructor
 */
export function Event(eventName?: string): MethodDecorator {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    attachClassMetadata(
      PLUS_EVENT_KEY,
      {
        eventName,
        propertyKey,
        descriptor
      },
      target
    )
  }
}
