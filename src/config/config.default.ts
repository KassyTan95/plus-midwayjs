import type { PlusConfig } from '../interface'

export default {
  plus: {
    jwt: {
      enable: false,
      secret: '695VUeu6u2BUt2c3',
      sign: {
        expiresIn: '30d'
      }
    },
    sign: {
      enable: false,
      key: 'plus-sign',
      salt: 'plus-middwayjs'
    }
  } as PlusConfig
}
