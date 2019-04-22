# ReactNativeAppDemo
**ReactNativeAppDemo** 是一个以react-native+mobx为基础搭建的app案例，旨在让初学者了解基本的RNApp的搭建与应用。

教程包含基础框架搭建、路由封装、导航栏封装、service封装、全局报错处理封装、高阶组件封装、全局事件消息总线封装...

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

1.根目录新建`src/pages/`目录，在`pages`下新建`home/home.js`

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

b）在`pages`下新建`page1/page1.js`、`page2/page2.js`、`page3/page3.js`、`list/list.js`、`detail/detail.js`，示例如下：（仅写一个示例，其他自行模仿）

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

e）在`App.js`中使用路由：

```
import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-navigation'
import Router from './src/router';
import {colors} from './src/assets/styles/colors-theme';

export default class App extends Component {
  render() {
    return (
      <SafeAreaView
        style={{flex: 1, backgroundColor: colors.statusBarColor}}
        forceInset={{
          top: 'always',
          bottom: 'always'
        }}
      >
        <StatusBar
          animated={true}
          barStyle={'light-content'}
          backgroundColor={colors.statusBarColor}
          translucent={true}
        />
        <Router/>
      </SafeAreaView>
    );
  }
}
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

修改`App.js`中的`Router`

```
<Router/>

改为

import {handleNavigationChange} from './src/common/history'
<Router
  onNavigationStateChange={handleNavigationChange}
/>
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
`src`目录下新建`assets/styles/colors-theme.js`示例：全局控制整个APP所需的颜色

```
export const colors = {
  statusBarColor: '#23A2FF'
}
```

**<a name="constants">2.服务基础配置</a>**
`src/common`目录下新建`constants.js`, 用于配置全局所需的服务地址、设备号、设备类型、版本号、分页数量等等

```
(如果不需要设备号则无需下载)
$ yarn add react-native-device-info
$ react-native link react-native-device-info


/**
 * 提供基础配置信息
 * constants.js 提供如服务器地址、分页数量、设备类型、设备号、版本号等配置
 */
import { Platform } from 'react-native'
import DeviceInfo from 'react-native-device-info'

export default {
  serverUrl: 'http://127.0.0.1:3600/portal',
  pageSize: 10,
  deviceType: Platform.OS.toUpperCase(),
  deviceNo: DeviceInfo.getUniqueID().replace('-').substr(0, 12),
  versionName: DeviceInfo.getVersion(), //也可写死如'1.0.0'
}

```

**<a name="serviceError">3.服务报错配置</a>**
`src/common`目录下新建`service-error.js`, 用于配置全局服务报错

```
/**
 * 服务报错处理
 */

export default class ServiceError extends Error{
  constructor(code, message){
    super(message);
    this.code = code;
    this.hash = Math.random() * 100000000000000000;
    this.signature = 'ServiceError';
  }
}
```

**<a name="code">4.code配置</a>**
`src/common`目录下新建`code.js`, 用于配置全局请求code

```
/**
 * code.js提供全局的请求服务字段处理
 */
export default {
  SUCCESS: 'SUCCESS', //请求成功
  REQUEST_FAILED: 'REQUEST_FAILED', //请求失败
  REQUEST_TIMEOUT: 'REQUEST_TIMEOUT', //请求超时
  UN_KNOWN_ERROR: 'UN_KNOWN_ERROR', //未知错误
  TOKEN_INVALID: 'TOKEN_INVALID', //token失效
  SESSION_TIMEOUT: 'SESSION_TIMEOUT', //会话超时
}
```


## 封装顶部导航栏NaviBar
顶部导航栏用于显示当前页面的标题，操作路由的跳转，放置部分功能模块，如分享、弹框、设置等

新增`prop-types`,用于封装类型校验
```
$ yarn add prop-types
```

在`src`下新建`components/navi-bar.js`,示例如下：
```
import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Platform } from 'react-native'
import PropTypes from 'prop-types'
import {colors} from '../assets/styles/colors-theme';
import Icon from 'react-native-vector-icons/Ionicons'

const { width } = Dimensions.get('window')

export default class NaviBar extends Component {
  static propTypes = {
    style: PropTypes.object,
    leftItem: PropTypes.node, //原则上控制在宽度40的icon
    rightItem: PropTypes.node, //原则上控制在宽度40的icon
    title: PropTypes.string,
    titleColor: PropTypes.string,
    onBack: PropTypes.func,
    iconColor: PropTypes.string
  }

  render() {
    const props = this.props;

    return (
      <View style={[styles.naviBar, props.style]}>
        <View style={{width: 40}}>
          {
            props.leftItem ? props.leftItem : (
              props.onBack ? (
                <TouchableOpacity style={{paddingLeft: 15}} onPress={props.onBack}>
                  <Icon
                    name="md-arrow-back"
                    size={20}
                    color={props.iconColor || '#ffffff'}
                  />
                </TouchableOpacity>
              ) : <View/>
            )
          }
        </View>
        <Text style={{color: props.titleColor || '#fff'}}>{props.title}</Text>
        <View style={{width: 40}}>
          {
            props.rightItem ? props.rightItem : <View/>
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.flatten({
  naviBar: {
    width,
    height: Platform.OS === 'ios' ? 44 : 56, //ios原生导航高度是44，android是56
    backgroundColor: colors.statusBarColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

```

修改`list.js`,示例如下：

```
import React, { Component } from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import NaviBar from '../../components/navi-bar';
import history from '../../common/history';
import {colors} from '../../assets/styles/colors-theme';

export default class List extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <NaviBar
          title={'List列表页'}
          onBack={history.goBack.bind(this, this)}
        />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>List</Text>
          <TouchableOpacity style={styles.button} onPress={() => history.push(this, '/detail', {name: 'suannai'})}>
            <Text style={styles.buttonText}>跳转到Detail</Text>
          </TouchableOpacity>
        </View>
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

## 基础服务请求返回封装
一般来说，大项目都需要统一封装一个基础服务组件，通过这个组件去全局处理request和返回response，处理全局的服务报错。

1.`fetch`拦截器的实现：
```
$ yarn add fetch-intercept

示例如下：
import fetchIntercept from 'fetch-intercept'

fetchIntercept.register({
  request: function (url, config) {
    return [url, config];
  },
  requestError: function (error) {
    return Promise.reject(error);
  },
  response: function (res) {
    return res;
  },
  responseError: function (error) {
    return Promise.reject(error);
  }
});

```

2.在`src`下新建`services/base-service.js`,封装`BaseService`（<a href="#constants">constants</a>、<a href="#serviceError">ServiceError</a>、<a href="#code">code</a>的封装在上面）

```
/**
 * 基础服务类封装
 * BaseService
 */
import fetchIntercept from 'fetch-intercept'
import constants from '../common/constants';
import ServiceError from '../common/service-error';
import code from '../common/code';

const fetchApi = fetch; // eslint-disable-line

fetchIntercept.register({
  request: function (url, config) {
    return [url, config];
  },
  requestError: function (error) {
    return Promise.reject(error);
  },
  response: function (res) {
    return res;
  },
  responseError: function (error) {
    return Promise.reject(error);
  }
});

export default class BaseService {
  constructor(props){
    if(props && props.showLoading){
      this.showLoading = props.showLoading;
    }
    if(props && props.hideLoading){
      this.hideLoading = props.hideLoading;
    }
  }

  async request(method, url, params, errorMsgIndex, showLoading = true, acceptType = 'application/json') {
    // 如果url不全，则自动补全
    if(url.indexOf('http://') < 0 && url.indexOf('https://') < 0){
      url = constants.serverUrl + '/' + url;
    }

    if(showLoading  && this.showLoading){
      this.showLoading();
    }

    let res = null
    let timer = null

    try {
      const options = {
        method: method,
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
          'accept': acceptType,
          'Cache-Control': 'no-cache'
        }
      }

      if(method === 'POST' || method === 'PUT') {
        params.DeviceType = constants.deviceType
        params.DeviceNo = constants.deviceNo

        options.body = JSON.stringify(params || {})
      }

      res = await fetchApi(url, options)
    } catch (e) {
      if(this.hideLoading){
        if(timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          this.hideLoading()
        }, 2000)
      }

      throw new ServiceError(code.REQUEST_FAILED, '网络请求失败')
    }

    if(res.status && res.status >= 200 && res.status < 300) {
      const contentType = res.headers.get('Content-Type')

      if(this.hideLoading){
        this.hideLoading()
      }

      if(contentType.indexOf('text/plain') >= 0 || contentType.indexOf('text/html') >= 0){
        return res.text()
      }else{
        const responseJson = await res.json();
        if (responseJson && !responseJson.jsonError) {
          return responseJson
        } else {
          throw new ServiceError(responseJson.jsonError[0]._exceptionMessageCode || code.REQUEST_FAILED, responseJson.jsonError[0]._exceptionMessage);
        }
      }
    } else {
      if(this.hideLoading){
        if(timer) {
          clearTimeout(timer)
        }

        timer = setTimeout(() => {
          this.hideLoading()
        }, 2000)
      }

      if (res.status === 401) {
        throw new ServiceError(code.REQUEST_TIMEOUT, res.data.message);
      } else if (res.ok) {
        try {
          const responseJson = await res.json();
          const { message } = responseJson;
          throw new ServiceError(code.REQUEST_FAILED, message);
        } catch (e) {
          throw new ServiceError(code.REQUEST_FAILED, '服务未知错误');
        }
      }
    }
  }

  /**
   * GET 后台数据
   * @param url
   * @param errorMsg 报错消息
   * @returns {Promise<*>}
   */
  async fetchJson(url, errorMsg, showLoading = true){
    return await this.request('GET', url, null, errorMsg, showLoading)
  }

  /**
   * POST请求
   * @param url
   * @param params
   * @param errorMsg 报错消息
   * @returns {Promise.<void>}
   */
  async postJson(url, params, errorMsg, showLoading = true){
    return await this.request('POST', url, params, errorMsg, showLoading)
  }

}
```

**使用`BaseService`**
在`src/services`下新建`list-service.js`

```
/**
 * 列表页服务
 */
import BaseService from './base-service';

export default class ListService extends BaseService {
  /**
   * 获取列表
   * @return {Promise<void>}
   */
  async getList() {
    const res = await this.postJson('qryList.do', {})

    return res;
  }
}
```

修改`list.js`

```
...
import ListService from '../../services/list-service';

export default class List extends Component {
  constructor(props) {
    super(props)
    ...
    this.listService = new ListService(props)
  }

  async componentDidMount() {
    const res = await this.listService.getList();
    ...
  }

  ...
}

```

## 基础服务的使用

**1.封装LoadingView**
封装`LoadingView`是给全局提供一个加载动画，服务器的加载需要时间，一般以加载动画来过渡。目前我选择国际上最火的[lottie](http://airbnb.io/lottie/#/react-native),动画所需`json`文件自行去[lottiefiles](https://lottiefiles.com/recent)下载

```
$ yarn add lottie-react-native
$ react-native link lottie-react-native
```

在`src/common`下新建`loading.js`, 同时在`src/assets`下新建`animations/loading.json`

```
import React, { Component } from 'react'
import {View, Dimensions, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import LoadingAnimation from '../assets/animations/loading';

const { width, height } = Dimensions.get('window')

export default class LoadingView extends Component {
  render(){
    if(this.props.visible){
      return (
        <View style={styles.wrapper}>
          <View style={styles.loading}>
            <LottieView source={LoadingAnimation} autoPlay={this.props.visible} loop={this.props.visible} />
          </View>
        </View>
      )
    }else{
      return <View/>
    }
  }
}

const styles = StyleSheet.flatten({
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  loading:{
    position: 'absolute',
    top: height / 2 - 100,
    left: width / 2 - 70,
    width: 140,
    height: 140
  }
});
```

在`App.js`中使用`LoadingView`,引入LoadingView放在Router下方就行

```
import LoadingView from './src/common/loading'

...
<Router
  onNavigationStateChange={handleNavigationChange}
/>
<LoadingView visible={this.state.loadingCount > 0} />
...
```

**2.loading-hoc高阶组件封装**

在`src`下新建`hocs/loading-hoc.js`, loading-hoc是一个高阶组件，用于在页面外部以`@`修饰符引用`LoadingHoc`(查看<a name="event">Event</a>事件消息总线封装)

```
import React, {Component} from 'react';
import {Dimensions, View} from 'react-native';
const { width, height } = Dimensions.get('window')
import Event from '../common/event'

export default function LoadingHoc(WrappedComponent) {
  return class ComposedComponent extends Component {
    showLoading(){
      Event.emit('SHOW_LOADING')
    }

    hideLoading(){
      Event.emit('HIDE_LOADING')
    }

    render() {
      const props = {...this.props, ...{
          showLoading: this.showLoading.bind(this),
          hideLoading: this.hideLoading.bind(this)
        }};
      return (
        <View style={{width, height}}>
          <WrappedComponent  {...props} />
        </View>
      );
    }
  };
}

```

在`List`中引入`LoadingHoc`


```
...
@LoadingHoc
export default class List extends Component {
  constructor(props) {
    super(props)
    ...
    this.listService = new ListService(props)
  }

  async componentDidMount() {
    const res = await this.listService.getList();
    ...
  }
}

```

**3.全局事件消息总线封装**
在`src/common`下新建`notification-center.js`和`event.js`


notification-center.js示例：

```
const __notices = [];
/**
 * addNotification
 * 注册通知对象方法
 *
 * 参数:
 * name： 注册名，一般let在公共类中
 * selector： 对应的通知方法，接受到通知后进行的动作
 * observer: 注册对象，指Page对象
 */
function addNotification(name, selector, observer) {
  if (name && selector) {
    if (!observer) {
      console.log(
        "addNotification Warning: no observer will can't remove notice"
      );
    }
    const newNotice = {
      name: name,
      selector: selector,
      observer: observer
    };

    addNotices(newNotice);
  } else {
    console.log('addNotification error: no selector or name');
  }
}

/**
 * 仅添加一次监听
 *
 * 参数:
 * name： 注册名，一般let在公共类中
 * selector： 对应的通知方法，接受到通知后进行的动作
 * observer: 注册对象，指Page对象
 */
function addOnceNotification(name, selector, observer) {
  if (__notices.length > 0) {
    for (let i = 0; i < __notices.length; i++) {
      const notice = __notices[i];
      if (notice.name === name) {
        if (notice.observer === observer) {
          return;
        }
      }
    }
  }
  this.addNotification(name, selector, observer);
}

function addNotices(newNotice) {
  // if (__notices.length > 0) {
  //     for (var i = 0; i < __notices.length; i++) {
  //         var hisNotice = __notices[i];
  //         //当名称一样时进行对比，如果不是同一个 则放入数组，否则跳出
  //         if (newNotice.name === hisNotice.name) {
  //             if (!cmp(hisNotice, newNotice)) {
  //                 __notices.push(newNotice);
  //             }
  //             return;
  //         }else{
  //             __notices.push(newNotice);
  //         }

  //     }
  // } else {

  // }

  __notices.push(newNotice);
}

/**
 * removeNotification
 * 移除通知方法
 *
 * 参数:
 * name: 已经注册了的通知
 * observer: 移除的通知所在的Page对象
 */

function removeNotification(name, observer) {
  console.log('removeNotification:' + name);
  for (let i = 0; i < __notices.length; i++) {
    const notice = __notices[i];
    if (notice.name === name) {
      if (notice.observer === observer) {
        __notices.splice(i, 1);
        return;
      }
    }
  }
}

/**
 * postNotificationName
 * 发送通知方法
 *
 * 参数:
 * name: 已经注册了的通知
 * info: 携带的参数
 */

function postNotificationName(name, info) {
  console.log('postNotificationName:' + name);
  if (__notices.length === 0) {
    console.log("postNotificationName error: u hadn't add any notice.");
    return;
  }

  for (let i = 0; i < __notices.length; i++) {
    const notice = __notices[i];
    if (notice.name === name) {
      notice.selector(info);
    }
  }
}

// 用于对比两个对象是否相等
function cmp(x, y) { // eslint-disable-line
                     // If both x and y are null or undefined and exactly the same
  if (x === y) {
    return true;
  }

  // If they are not strictly equal, they both need to be Objects
  if (!(x instanceof Object) || !(y instanceof Object)) {
    return false;
  }

  // They must have the exact same prototype chain, the closest we can do is
  // test the constructor.
  if (x.constructor !== y.constructor) {
    return false;
  }

  for (const p in x) {
    // Inherited properties were tested using x.constructor === y.constructor
    if (x.hasOwnProperty(p)) {
      // Allows comparing x[ p ] and y[ p ] when set to undefined
      if (!y.hasOwnProperty(p)) {
        return false;
      }

      // If they have the same strict value or identity then they are equal
      if (x[p] === y[p]) {
        continue;
      }

      // Numbers, Strings, Functions, Booleans must be strictly equal
      if (typeof x[p] !== 'object') {
        return false;
      }

      // Objects and Arrays must be tested recursively
      if (!Object.equals(x[p], y[p])) {
        return false;
      }
    }
  }

  for (const p in y) {
    // allows x[ p ] to be set to undefined
    if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
      return false;
    }
  }
  return true;
}

module.exports = {
  addNotification: addNotification,
  removeNotification: removeNotification,
  postNotificationName: postNotificationName,
  addOnceNotification: addOnceNotification
};

```


event.js示例：

```
/**
 * 一个JavaScript 事件消息总线
 */
import NotificationCenter from './notification-center';

export default class Event {
  static listen(eventName, callback, observer) {
    NotificationCenter.addNotification(eventName, callback, observer);
  }
  static emit(eventName, params) {
    NotificationCenter.postNotificationName(eventName, params);
  }
  static remove(eventName, observer) {
    NotificationCenter.removeNotification(eventName, observer);
  }
}

```


**4.全局报错处理**
在`src/common`下新建`global-error-handler.js`


global-error-handler.js示例：


```
import code from './code';
import Event from './event'

export function handleErrors(error){
  if(error && error.signature && error.signature === 'ServiceError') {
    defaultServiceErrorHandler(error);
  }else{
    defaultErrorHandler(error);
  }
}

function defaultServiceErrorHandler(error){
  if(error && error.code === code.SESSION_TIMEOUT){
    Event.emit('GLOBAL_ERROR', {
      type: 'SESSION_TIMEOUT'
    })
  }else if(error && error.message) {
    Event.emit('GLOBAL_ERROR', {
      type: 'SERVICE_ERROR',
      message: error.message
    })
  }else {
    Event.emit('GLOBAL_ERROR', {
      type: 'SERVICE_ERROR',
      message: '服务出错，请稍后再试.'
    })
  }
}

function defaultErrorHandler(error){
  if(error && error.message) {
    Event.emit('GLOBAL_ERROR', {
      type: 'SERVICE_ERROR',
      message: error.message
    })
  }else {
    Event.emit('GLOBAL_ERROR', {
      type: 'SERVICE_ERROR',
      message: '服务出错，请稍后再试.'
    })
  }
}

```


**5.全局监听**

```
$ yarn add promise-polyfill
```

## mobx的使用

```
$ yarn add mobx mobx-react
$ yarn add @babel/cli @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators @babel/plugin-proposal-object-rest-spread @babel/plugin-transform-classes @babel/plugin-transform-flow-strip-types @babel/plugin-transform-runtime @babel/polyfill @babel/preset-env @babel/preset-flow @babel/preset-react babel-loader babel-plugin-module-resolver babel-plugin-transform-runtime babel-polyfill babel-preset-es2015 babel-preset-react babel-preset-react-native babel-preset-react-native-stage-0 babel-preset-react-native-syntax -D
```

`.babelrc`或`babel.config.js`添加如下代码：

```
{
  presets: ['module:metro-react-native-babel-preset', '@babel/preset-flow'],
  plugins: [
    '@babel/transform-flow-strip-types',
    [
      '@babel/plugin-proposal-decorators', { 'legacy' : true }
    ],
    [
      '@babel/plugin-proposal-class-properties', {'loose': true}
    ],
    [
      '@babel/plugin-transform-runtime', {}
    ],
    ['import', { 'libraryName': '@ant-design/react-native' }]
  ]
}
```

