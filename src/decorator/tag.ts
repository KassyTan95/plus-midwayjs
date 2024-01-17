import { saveClassMetadata, savePropertyDataToClass, saveModule } from '@midwayjs/core'

export const PLUS_URL_TAG_KEY = 'decorator:plus:url:tag'

export const PLUS_METHOD_TAG_KEY = 'decorator:plus:method:tag'

export enum TagTypes {
  IGNORE_TOKEN = 'ignoreToken',
  IGNORE_SIGN = 'ignoreSign'
}

export interface PlusUrlTagConfig {
  key: TagTypes | string
  value?: string[]
}

/**
 * 打标记
 * @param data
 * @constructor
 */
export function PlusTagClass(data?: PlusUrlTagConfig): ClassDecorator {
  return (target: any) => {
    // 将装饰的类，绑定到该装饰器，用于后续能获取到 class
    saveModule(PLUS_URL_TAG_KEY, target)
    // 保存一些元数据信息，任意你希望存的东西
    saveClassMetadata(PLUS_URL_TAG_KEY, data, target)
  }
}

/**
 * 方法打标记
 * @param tag
 * @constructor
 */
export function PlusTagMethod(tag: TagTypes | string): MethodDecorator {
  return (target, key, descriptor: PropertyDescriptor) => {
    savePropertyDataToClass(
      PLUS_METHOD_TAG_KEY,
      {
        key,
        tag
      },
      target,
      key
    )
    return descriptor
  }
}
