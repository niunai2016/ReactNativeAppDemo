import React, { Component } from 'react'
import { View, Text } from 'react-native'
import NaviBar from '../../components/navi-bar';

export default class Page2 extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <NaviBar title={'Page2'}/>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Page2</Text>
        </View>
      </View>
    )
  }
}