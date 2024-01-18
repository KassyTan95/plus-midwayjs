import { MiddlewareParamArray } from '@midwayjs/core'
import { DecodeOptions, SignOptions, VerifyOptions } from 'jsonwebtoken'

/**
 * 全局配置
 */
export interface PlusConfig {
  jwt: JwtConfig
  sign: signConfig
}

/**
 * 模块配置
 */
export interface ModuleConfig {
  // 模块名称
  name: string
  // 模块中间件
  middlewares?: MiddlewareParamArray
  // 全局中间件
  globalMiddlewares?: MiddlewareParamArray
  // 加载顺序
  order?: number
  // jwt配置
  jwt?: JwtConfig
  // sign配置
  sign?: signConfig
}

export interface JwtConfig {
  enable: boolean
  secret: string
  sign?: SignOptions
  verify?: VerifyOptions
  decode?: DecodeOptions
}

export interface signConfig {
  enable: boolean
  key: string
  salt: string
}

export interface BaseResponse<T> {
  code: number
  msg: string
  data?: T
  timestamp?: number
}

// 分页参数
export interface IPaginationOptions {
  page: number
  limit: number
}

// 分页数据
export interface createPaginationObject<T> {
  total: number
  currentPage: number
  pageSize: number
  data: T[]
}

// type WithPartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
