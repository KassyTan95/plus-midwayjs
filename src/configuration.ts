import {
  App,
  Configuration,
  Context,
  ILogger,
  IMidwayBaseApplication,
  IMidwayContainer,
  Inject,
  Logger
} from '@midwayjs/core'
import * as DefaultConfig from './config/config.default'
import * as koa from '@midwayjs/koa'
import { PlusEventManager } from './event'
import location from './util/location'
import { PlusDecorator } from './decorator'
import { PlusExceptionFilter } from './exception/filter'
import { PlusModuleConfig } from './module/config'
import { JwtMiddleware } from './middleware/jwt.middleware'
import { SignatureMiddleware } from './middleware/signature.middleware'

@Configuration({
  namespace: 'plus',
  importConfigs: [
    {
      default: DefaultConfig
    }
  ]
})
export class PlusConfiguration {
  @Logger()
  coreLogger: ILogger

  @App()
  app: koa.Application

  @Inject()
  plusEventManager: PlusEventManager

  async onReady(container: IMidwayContainer) {
    this.plusEventManager.emit('onReady')
    // 处理模块配置
    await container.getAsync(PlusModuleConfig)
    // 事件
    await container.getAsync(PlusEventManager)
    // 装饰器
    await container.getAsync(PlusDecorator)
    // 异常处理
    this.app.useFilter([PlusExceptionFilter])
    // 中间件
    this.app.useMiddleware([JwtMiddleware, SignatureMiddleware])
    const figlet = require('figlet')
    console.log(
      '\n',
      figlet.textSync('PLUS-MIDWAY', {
        font: 'Standard',
        horizontalLayout: 'default',
        verticalLayout: 'default'
      })
    )
    setTimeout(() => {
      location.clean()
    }, 10000)
  }

  async onConfigLoad(container: IMidwayContainer, mainApp?: IMidwayBaseApplication<Context>) {}

  async onServerReady() {
    this.plusEventManager.emit('onServerReady')
    await location.clean()
  }
}
