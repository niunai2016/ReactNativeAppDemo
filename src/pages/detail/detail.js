import React, { Component } from 'react'
import { View, Text } from 'react-native'
import NaviBar from '../../components/navi-bar';
import history from '../../common/history';

export default class Detail extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <NaviBar
          title={'Detail详情页'}
          onBack={history.goBack.bind(this, this)}
        />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Detail</Text>
        </View>
      </View>
    )
  }
}