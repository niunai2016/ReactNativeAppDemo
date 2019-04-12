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

相关配置：（如Eslint、Babel等）

1.添加Eslint: 在根目录新增.eslintrc


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


