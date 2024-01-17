import { PowerPartial } from '@midwayjs/core/dist/interface'
import { PlusConfig } from './src'

export * from './dist/index'

declare module '@midwayjs/core/dist/interface' {
  interface MidwayConfig {
    plus?: PowerPartial<PlusConfig>
  }
}
