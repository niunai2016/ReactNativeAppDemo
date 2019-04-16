import React, { Component } from 'react'
import { View, Text } from 'react-native'
import NaviBar from '../../components/navi-bar';

export default class Page1 extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <NaviBar title={'Page1'}/>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Page1</Text>
        </View>
      </View>
    )
  }
}