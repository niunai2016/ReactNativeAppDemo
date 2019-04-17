import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-navigation'
import Router from './src/router';
import {colors} from './src/assets/styles/colors-theme';
import {handleNavigationChange} from './src/common/history';
import {Provider, Modal} from '@ant-design/react-native'
import LoadingView from './src/common/loading';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.timer = null
    this.state = {
      loadingCount: 0
    }
  }

  render() {
    return (
      <Provider>
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
    }, 60)
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
    }, 60)
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
