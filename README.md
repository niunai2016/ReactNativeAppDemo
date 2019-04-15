# ReactNativeAppDemo
**ReactNativeAppDemo** 是一个以react-native+mobx为基础搭建的app案例，旨在让初学者了解基本的RNApp的搭建与应用。

## 支持平台
- [x] IOS
- [x] Android

## 基础环境搭建
按照[react-native中文官网](https://reactnative.cn/docs/getting-started/)搭建基础环境

```
$ react-native init ReactNativeAppDemo
```

**相关配置**：（如Eslint、git、Babel等）

1.Eslint配置: 在根目录新增.eslintrc 和 .eslintignore,具体配置看本文源码，也可查阅官方资料

```
$ yarn add eslint babel-eslint eslint-config-prettier eslint-plugin-flowtype eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-promise eslint-plugin-react -D
```
2.git配置：根据官方自行配置，也可参考本文源码



## 路由功能
一般RN的路由通过官方推荐的[react-navigation](https://reactnavigation.org/docs/zh-Hans/getting-started.html)来实现，目前官方出到3.x

在你的 React Native 项目中安装`react-navigation`这个包
```
$ yarn add react-navigation
```
然后，安装 react-native-gesture-handler。

```
$ yarn add react-native-gesture-handler
```
Link 所有的原生依赖

```
$ react-native link react-native-gesture-handler
```
若想获取更多配置和用法，请移步至[react-navigation中文官网](https://reactnavigation.org/zh-Hans/)

**路由组件封装**

1.根目录新建`src/pages/`目录，在`pages`下新建`home\home.js`

a）`home.js`示例：（所用的<a href="#history">history</a>及<a href="#colors">colors</a>在后文也有示例）

```
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import {colors} from '../../assets/styles/colors-theme';
import history from '../../common/history';

export default class Home extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Home</Text>
        <TouchableOpacity style={styles.button} onPress={() => history.push(this, '/list', {name: 'niunai'})}>
          <Text style={styles.buttonText}>跳转到List</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.flatten({
  button: {
    marginTop: 20,
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.statusBarColor
  },
  buttonText: {
    color: '#fff'
  }
})
```

b）在`pages`下新建`page1\page1.js`、`page2\page2.js`、`page3\page3.js`、`list\list.js`、`detail\detail.js`，示例如下：（仅写一个示例，其他自行模仿）

`page1`示例:

```
import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class Page1 extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Page1</Text>
      </View>
    )
  }
}
```

c）在`pages`下新建`router.js`，示例如下（`tab-nav`下文会讲到）：

```
import {createStackNavigator, createAppContainer} from 'react-navigation'
import List from './pages/list/list';
import Detail from './pages/detail/detail';
import {TabNav} from './common/tab-nav';

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
```

d）`tab-nav`的封装： `src`目录下新建`common/tab-nav.js`,示例如下(<a href="#icon">Icon</a> 下文有介绍)：

```
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import {createBottomTabNavigator} from 'react-navigation';

import Home from '../pages/home/home';
import Page3 from '../pages/page3/page3';
import Page1 from '../pages/page1/page1';
import Page2 from '../pages/page2/page2';
import {colors} from '../assets/styles/colors-theme';

const TabRouterMap = {
  home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon:({focused}) => (
        <Icon
          focused={focused}
          name="md-close-circle"
          color={focused ? colors.statusBarColor : '#000'}
        />
      )
    }
  },
  page1: {
    screen: Page1,
    navigationOptions: {
      tabBarLabel: 'Page1',
      tabBarIcon:({focused}) => (
        <Icon
          focused={focused}
          name="md-close-circle"
          color={focused ? colors.statusBarColor : '#000'}
        />
      )
    }
  },
  page2: {
    screen: Page2,
    navigationOptions: {
      tabBarLabel: 'Page2',
      tabBarIcon:({focused}) => (
        <Icon
          focused={focused}
          name="md-close-circle"
          color={focused ? colors.statusBarColor : '#000'}
        />
      )
    }
  },
  page3: {
    screen: Page3,
    navigationOptions: {
      tabBarLabel: 'Page3',
      tabBarIcon:({focused}) => (
        <Icon
          focused={focused}
          name="md-close-circle"
          color={focused ? colors.statusBarColor : '#000'}
        />
      )
    }
  }
}

export const TabNav = createBottomTabNavigator(TabRouterMap,{
  initialRouteName: 'home',
  tabBarOptions: {
    //当前选中的tab bar的文本颜色和图标颜色
    activeTintColor: colors.statusBarColor,
    //当前未选中的tab bar的文本颜色和图标颜色
    inactiveTintColor: '#000',
    //是否显示tab bar的图标，默认是false
    showIcon: true,
    //showLabel - 是否显示tab bar的文本，默认是true
    showLabel: true,
    //是否将文本转换为大小，默认是true
    upperCaseLabel: false,
    //material design中的波纹颜色(仅支持Android >= 5.0)
    pressColor: 'red',
    //按下tab bar时的不透明度(仅支持iOS和Android < 5.0).
    pressOpacity: 0.8,
    //tab bar的样式
    // style: {
    //   backgroundColor: '#fff',
    //   paddingBottom: 1,
    //   borderTopWidth: 0.2,
    //   paddingTop:1,
    //   borderTopColor: '#ccc',
    // },
    //tab bar的文本样式
    labelStyle: {
      fontSize: 11,
      margin: 1
    },
    //tab 页指示符的样式 (tab页下面的一条线).
    indicatorStyle: {height: 0},
  },
  //tab bar的位置, 可选值： 'top' or 'bottom'
  tabBarPosition: 'bottom',
  //是否允许滑动切换tab页
  swipeEnabled: true,
  //是否在切换tab页时使用动画
  animationEnabled: false,
  //是否懒加载
  lazy: true,
  //返回按钮是否会导致tab切换到初始tab页？ 如果是，则设置为initialRoute，否则为none。 缺省为initialRoute。
  backBehavior: 'none'
})
```

**<a name="history">2.history的基本封装</a>**
history是控制路由跳转的模块，一般封装出push、replace、goback、pop等，在`src`目录下新建`common/history.js`,示例如下：

```
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
```

## <a name="icon">字体图标库</a>
app中需要用到大量的小图标，本文选择[react-native-vector-icons](https://oblador.github.io/react-native-vector-icons/)

```
$ yarn add react-native-vector-icons
$ react-native link react-native-vector-icons

使用方法：
import Icon from 'react-native-vector-icons/Ionicons'

<Icon
  name="md-close-circle"
  color={'#000'}
/>

```

## 其他配置
**<a name="colors">1.样式配置</a>**
`src`目录下新建`assets\styles\colors-theme.js`示例：全局控制整个APP所需的颜色

```
export const colors = {
  statusBarColor: '#23A2FF'
}
```

