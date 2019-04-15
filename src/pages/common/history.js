const NAVIGATION_THROTTLE = 1000; // 1s内不准重复跳转
const lastNavigationTimeStamps = {};

/**
 * 校验页面跳转参数 防止同一个path在很短的时间内被反复调用
 * @param path
 */
function validate(path) {
  const timestamp = new Date().valueOf();
  if(lastNavigationTimeStamps[path] && (timestamp - lastNavigationTimeStamps[path]) < NAVIGATION_THROTTLE) {
    lastNavigationTimeStamps[path] = timestamp
    return false
  } else {
    lastNavigationTimeStamps[path] = timestamp
  }

  return true
}

/**
 * 处理路由跳转的状态
 * @param prevState
 * @param newState
 * @param action
 */
export function handleNavigationChange(prevState, newState, action) {
  console.log('@@@@@ prevState', prevState)
  console.log('@@@@@ newState', newState)
  console.log('@@@@@ action', action)
}

const history = {
  push: (instance, path, state) => {
    if(validate(path)) {
      const navigationController = instance.props.navigation;
      const nativePath =
        path.charAt(0) === '/' ? path.substring(1, path.length) : path;

      navigationController.push(nativePath, state)
    }
  },
  replace: (instance, path, state) => {
    if(validate(path)) {
      const navigationController = instance.props.navigation;
      const nativePath =
        path.charAt(0) === '/' ? path.substring(1, path.length) : path;

      navigationController.replace(nativePath, state)
    }
  },
  goBack: (instance) => {
    if(instance) {
      const navigationController = instance.props.navigation;
      navigationController.goBack()
    }
  },
  pop: (instance, n) => {
    if(instance) {
      const navigationController = instance.props.navigation;
      navigationController.pop(-1 * n || -1)
    }
  }
}

export default history;