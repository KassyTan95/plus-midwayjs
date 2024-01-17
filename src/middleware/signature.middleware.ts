import { ALL, Config, httpError, Init, Inject, Middleware } from '@midwayjs/core'
import { TagTypes } from '../decorator/tag'
import { PlusUrlTagData } from '../tag/data'
import { Context, NextFunction } from '@midwayjs/koa'
import { signConfig } from '../interface'

import * as crypto from 'crypto-js'

@Middleware()
export class SignatureMiddleware {
  @Config('koa.globalPrefix')
  prefix: string

  @Inject()
  plusUrlTagData: PlusUrlTagData

  @Config(ALL)
  private readonly config: any

  private signConfig: signConfig

  private ignoreUrls: string[] = []

  public static getName(): string {
    return 'signature'
  }

  @Init()
  async init() {
    this.ignoreUrls = this.plusUrlTagData.byKey(TagTypes.IGNORE_SIGN) ?? []
  }

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      let { url } = ctx
      url = url.replace(this.prefix, '').split('?')[0]
      if (this.ignoreUrls.includes(url)) {
        await next()
        return
      }
      // 合并sign配置
      this.signConfig = this.config.module[url.split('/')[1]]
        ? this.config.module[url.split('/')[1]]['sign']
        : this.config.plus.sign
      this.signConfig = Object.assign(this.config.plus.sign, this.signConfig)
      if (this.signConfig.enable && ctx.request.method !== 'GET') {
        const sign = ctx.headers[this.signConfig.key]
        if (!sign) {
          throw new httpError.UnauthorizedError('Signature authentication failed')
        }
        let newParams = {}
        Object.keys(ctx.request.body)
          .reverse()
          .forEach((key) => {
            newParams[key] = ctx.request.body[key]
          })
        const encParams = crypto
          .MD5(crypto.SHA512(JSON.stringify(newParams)).toString() + this.signConfig.salt)
          .toString()
        if (sign != encParams) {
          throw new httpError.UnauthorizedError('Signature authentication failed')
        }
      }
      await next()
    }
  }
}
