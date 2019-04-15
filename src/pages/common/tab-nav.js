import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import {createBottomTabNavigator} from 'react-navigation';

import Home from '../home/home';
import Page3 from '../page3/page3';
import Page1 from '../page1/page1';
import Page2 from '../page2/page2';
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
