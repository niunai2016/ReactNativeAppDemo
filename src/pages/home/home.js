import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import {colors} from '../../assets/styles/colors-theme';
import history from '../../common/history';
import NaviBar from '../../components/navi-bar';

export default class Home extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <NaviBar title={'Home'}/>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Home</Text>
          <TouchableOpacity style={styles.button} onPress={() => history.push(this, '/list', {name: 'niunai'})}>
            <Text style={styles.buttonText}>跳转到List</Text>
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