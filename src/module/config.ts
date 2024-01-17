import { ALL, App, Config, IMidwayApplication, Init, Provide, Scope, ScopeEnum } from '@midwayjs/core'
import * as fs from 'fs'
import type { ModuleConfig, PlusConfig as PlusConfigType } from '../interface'
import * as _ from 'lodash'

@Provide()
@Scope(ScopeEnum.Singleton)
export class PlusModuleConfig {
  @App()
  app: IMidwayApplication

  @Config(ALL)
  allConfig: { plus: PlusConfigType }

  @Init()
  async init() {
    let modules = []
    // 模块路径
    const moduleBasePath = `${this.app.getBaseDir()}/apps/`
    if (!fs.existsSync(moduleBasePath)) {
      return
    }
    if (!this.allConfig['module']) {
      this.allConfig['module'] = {}
    }
    // 全局中间件
    const globalMiddlewareArr = []
    for (const module of fs.readdirSync(moduleBasePath)) {
      const modulePath = moduleBasePath + module
      const dirStats = fs.statSync(modulePath)
      if (dirStats.isDirectory()) {
        const configPath = `${modulePath}/config.${this.app.getEnv() == 'local' ? 'ts' : 'js'}`
        if (fs.existsSync(configPath)) {
          const moduleConfig: ModuleConfig = require(configPath).default({
            app: this.app,
            env: this.app.getEnv()
          })
          modules.push({
            order: moduleConfig.order || 0,
            module
          })
          await this.moduleConfig(module, moduleConfig)
          // 处理全局中间件
          if (!_.isEmpty(moduleConfig.globalMiddlewares)) {
            globalMiddlewareArr.push({
              order: moduleConfig.order || 0,
              data: moduleConfig.globalMiddlewares
            })
          }
        }
      }
    }
    await this.globalMiddlewareArr(globalMiddlewareArr)
  }

  /**
   * 模块配置
   * @param module
   * @param config
   */
  async moduleConfig(module: string, config: Record<string, any>) {
    // 追加配置
    this.allConfig['module'][module] = config
  }

  /**
   * 全局中间件
   * @param middlewares 中间件
   */
  async globalMiddlewareArr(middlewares: any[]) {
    middlewares = _.orderBy(middlewares, ['order'], ['desc'])
    for (const middleware of middlewares) {
      for (const item of middleware.data) {
        this.app.getMiddleware().insertLast(item)
      }
    }
  }
}
