# midwayjs addon

## Quickstart

**npm Install**

```shell
npm install plus-middwayjs
```
**yarn Install**

```shell
yarn add plus-middwayjs
```

**pnpm Install**
```shell
pnpm add plus-middwayjs
```

## 示例
```typescript
import { BaseController, PlusController, PlusTagClass, PlusTagMethod, TagTypes } from 'plus-middwayjs'
import { Get, Put } from '@midwayjs/core'

@PlusTagClass()
@PlusController()
export class Index extends BaseController {
  @Get('/')
  index() {
    return this.apiResp<null>(null)
  }

  @Get('/test')
  @PlusTagMethod(TagTypes.IGNORE_TOKEN)
  test() {
    return 'hello world'
  }

  @Put('/sign')
  testSing() {
    return 'sign test'
  }
}

```


## 事件
> 事件是开发过程中经常使用到的功能，我们经常利用它来做一些解耦的操作。如：更新了用户信息，其他需要更新相关信息的操作自行监听更新等


### 新建监听
```typescript
import { Provide, Scope, ScopeEnum  } from '@cool-midway/core'
import { PlusEvent, Event } from 'plus-middwayjs'

/**
 * 接收事件
 */
@PlusEvent()
export class DemoEvent {
  /**
   * 根据事件名接收事件
   * @param msg
   * @param a
   */
  @Event('updateUser')
  async updateUser(msg, a) {
    console.log('TestEvent', 'updateUser', msg, a);
  }
}
```

### 发送事件

```typescript
import { Get, Inject, Provide } from '@midwayjs/core'
import { PlusController, BaseController, PlusEventManager } from "plus-middwayjs"

/**
 * 事件
 */
@Provide()
@PlusController()
export class DemoEventController extends BaseController {
  @Inject()
  plusEventManager: PlusEventManager;

  /**
   * 发送事件
   */
  @Get('/send')
  public async send() {
    this.plusEventManager.emit('updateUser', {a: 1}, 12);
  }
}
```
