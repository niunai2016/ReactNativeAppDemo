import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import {colors} from '../../assets/styles/colors-theme';
import history from '../../common/history';
import NaviBar from '../../components/navi-bar';
import { inject, observer } from 'mobx-react';

@inject('rootStore')
@observer
export default class Home extends Component {
  constructor(props) {
    super(props)
    this.store = props.rootStore.appStore
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <NaviBar title={'Home'}/>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Home</Text>
          <TouchableOpacity style={styles.button} onPress={() => {
            //添加timer的次数
            this.store.tick();
            const list = this.store.list;

            list.push({
              number: this.store.timer,
              label: '第'+this.store.timer + '次点击'
            })

            this.store.setList(list)
            history.push(this, '/list', {name: 'niunai'})
          }}>
            <Text style={styles.buttonText}>跳转到List</Text>
          </TouchableOpacity>
          <View style={{marginTop: 30}}>
            <Text>统计跳转到List的次数: {this.store.timer}</Text>
          </View>
          <TouchableOpacity style={[styles.button, {width: 140}]} onPress={() => {
            this.store.setList([]);
            this.store.resetTimer();
          }}>
            <Text style={styles.buttonText}>重置List和timer</Text>
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