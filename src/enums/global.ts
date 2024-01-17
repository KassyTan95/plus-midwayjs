export enum RESCODE {
  // 成功返回数据
  OK = 0,
  // 成功没数据
  OKNODATA = 1,
  // 参数验证失败
  VALIDATEFAIL = -1,
  // 公共失败
  COMMONFAIL = -1,
  // 核心异常
  COREFAIL = -100
}
