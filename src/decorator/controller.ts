import { CONTROLLER_KEY, ControllerOption, saveClassMetadata, saveModule } from '@midwayjs/core'
import location from '../util/location'

export function PlusController(prefix?: string): ClassDecorator {
  return (target: any) => {
    // 将装饰的类，绑定到该装饰器，用于后续能获取到 class
    saveModule(CONTROLLER_KEY, target)
    let prefix: string
    location.scriptPath(target).then(async (res: any) => {
      const pathSps = res.path.split('.')
      const paths = pathSps[pathSps.length - 2].split('/')
      const pathArr = []
      let module = null
      for (const path of paths.reverse()) {
        if (path != 'controller' && !module) {
          pathArr.push(path)
        }
        if (path == 'controller' && !paths.includes('apps')) {
          break
        }
        if (path == 'controller' && paths.includes('apps')) {
          module = 'ready'
        }
        if (module && path != 'controller') {
          module = path
          break
        }
      }
      if (module) {
        pathArr.splice(1, 0, module)
        pathArr.reverse()
      }
      if (!prefix) {
        prefix = `/${pathArr.join('/')}`
      }
      saveMetadata(prefix, target, module)
    })
  }
}

const saveMetadata = (prefix: string, target: any, module: any) => {
  saveClassMetadata(
    CONTROLLER_KEY,
    {
      prefix,
      module
    } as ControllerOption,
    target
  )
}
