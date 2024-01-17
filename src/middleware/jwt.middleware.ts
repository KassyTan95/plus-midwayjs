// import * as _ from 'lodash'
// import * as jwt from 'jsonwebtoken'

import { ALL, Config, httpError, Init, Inject, Middleware } from '@midwayjs/core'
import { Context, NextFunction } from '@midwayjs/koa'
import { PlusUrlTagData } from '../tag/data'
import { TagTypes } from '../decorator/tag'
import { JwtConfig } from '../interface'
import * as jwt from 'jsonwebtoken'

@Middleware()
export class JwtMiddleware {
  @Config('koa.globalPrefix')
  prefix: string

  @Inject()
  plusUrlTagData: PlusUrlTagData

  @Config(ALL)
  private readonly config: any

  private jwtConfig: JwtConfig

  private ignoreUrls: string[] = []

  @Init()
  async init() {
    this.ignoreUrls = this.plusUrlTagData.byKey(TagTypes.IGNORE_TOKEN) ?? []
  }

  public static getName(): string {
    return 'jwt'
  }

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      let { url } = ctx
      url = url.replace(this.prefix, '').split('?')[0]
      if (this.ignoreUrls.includes(url)) {
        await next()
        return
      }
      // 合并jwt配置
      this.jwtConfig = this.config.module[url.split('/')[1]]
        ? this.config.module[url.split('/')[1]]['jwt']
        : this.config.plus.jwt
      this.jwtConfig = Object.assign(this.config.plus.jwt, this.jwtConfig)
      if (this.jwtConfig.enable) {
        if (!ctx.headers['Authorization']) {
          throw new httpError.ForbiddenError('请先登录')
        }
        const parts = ctx.get('authorization').trim().split(' ')
        if (parts.length !== 2) {
          throw new httpError.ForbiddenError('登录过期, 请重新登录')
        }

        const [scheme, token] = parts
        if (/^Bearer$/i.test(scheme)) {
          try {
            jwt.verify(token, this.jwtConfig.secret, { complete: true })
          } catch (error) {
            const payload = jwt.decode(token)
            const newToken = jwt.sign(payload, this.jwtConfig.secret, {
              algorithm: 'HS256',
              expiresIn: this.jwtConfig.sign.expiresIn
            })
            ctx.set('Authorization', newToken)
          }
          await next()
        }
        return
      }
      await next()
    }
  }
}
