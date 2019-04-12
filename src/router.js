import {createStackNavigator, createAppContainer} from 'react-navigation'
import List from "./pages/list/list";
import Detail from "./pages/detail/detail";
import {TabNav} from "./pages/common/tab-nav";

function generateRoute(path, screen) {
  return {
    path,
    screen
  }
}


const stackRouterMap = {
  list: generateRoute('/list', List),
  detail: generateRoute('/detail', Detail),
  main: TabNav
}

const stackNavigate = createStackNavigator(stackRouterMap, {
  initialRouteName: 'main',
  headerMode: 'none'
})

const Router = createAppContainer(stackNavigate)

export default Router