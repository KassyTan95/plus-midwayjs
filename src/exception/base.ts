/**
 * 异常基类
 */
export class BaseException extends Error {
  status: number

  constructor(name: string, code: number, msg: string) {
    super(msg)

    this.name = name
    this.status = code
    this.message = msg
  }
}
