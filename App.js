/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-navigation'
import Router from './src/router';
import {colors} from './src/assets/styles/colors-theme';
import {handleNavigationChange} from './src/common/history';
import LoadingView from './src/common/loading';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingCount: 0
    }
  }

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
        <Router
          onNavigationStateChange={handleNavigationChange}
        />
        <LoadingView visible={this.state.loadingCount > 0} />
      </SafeAreaView>
    );
  }
}
