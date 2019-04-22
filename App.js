import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-navigation'
import Router from './src/router';
import {colors} from './src/assets/styles/colors-theme';
import {handleNavigationChange} from './src/common/history';
import {Provider as ProviderAntd, Modal} from '@ant-design/react-native'
import LoadingView from './src/common/loading';
import { Provider, observer } from 'mobx-react'
import * as stores from './src/stores/index';
import {handleErrors} from './src/common/global-error-handler';
import Event from './src/common/event';

@observer
export default class App extends Component {
  constructor(props) {
    super(props)
    this.timer = null
    this.state = {
      loadingCount: 0
    }

    require('promise/setimmediate/rejection-tracking').enable({
      allRejections: true,
      onUnhandled: (id, error) => {
        handleErrors(error);
      }
    })

    this._handleGlobalError = this.handleGlobalError.bind(this)
    this._handleShowLoading = this.handleShowLoading.bind(this)
    this._handleHideLoading = this.handleHideLoading.bind(this)
  }

  componentDidMount() {
    // 监听全局报错
    Event.listen('GLOBAL_ERROR', this._handleGlobalError, this)

    // 显示加载动画
    Event.listen('SHOW_LOADING', this._handleShowLoading, this)

    // 隐藏加载动画
    Event.listen('HIDE_LOADING', this._handleHideLoading, this)
  }

  //组件卸载之前移除监听
  componentWillUnmount() {
    Event.remove('GLOBAL_ERROR', this)
    Event.remove('SHOW_LOADING', this)
    Event.remove('HIDE_LOADING', this)
  }

  render() {
    return (
      <Provider rootStore={stores}>
        <ProviderAntd>
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
            <Router
              onNavigationStateChange={handleNavigationChange}
            />
            <LoadingView visible={this.state.loadingCount > 0} />
          </SafeAreaView>
        </ProviderAntd>
      </Provider>
    );
  }

  /**
   * showLoading
   */
  handleShowLoading() {
    if(this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      this.setState({
        loadingCount: this.state.loadingCount + 1
      })
    }, 50)
  }

  /**
   * hideLoading
   * @param bForece
   */
  handleHideLoading(bForece){
    if(this.timer){
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      if(this.state.loadingCount > 0){
        this.setState({
          loadingCount: (bForece ? 0 : this.state.loadingCount - 1)
        });
      }
    }, 50)
  }

  /**
   * 全局报错处理
   * @param event
   */
  handleGlobalError(event) {
    // 报错时，取消加载动画
    if(this.state.loadingCount > 0){
      this.handleHideLoading(true)
    }

    if(event && event.type){
      switch(event.type){
        case 'SESSION_TIMEOUT':
          Modal.alert('会话超时', '您的会话已超时，请重新登录')
          break;
        case 'SERVICE_ERROR':
          if(event.message) {
            Modal.alert('出错了', event.message)
          }
          break;
        default:
          if(event.message) {
            Modal.alert('温馨提示', '系统未知异常')
          }
          break;
      }
    }
  }
}
