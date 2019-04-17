import React, { Component } from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import NaviBar from '../../components/navi-bar';
import history from '../../common/history';
import {colors} from '../../assets/styles/colors-theme';
import ListService from "../../services/list-service";

export default class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      name: props.navigation.state.params.name
    }
    this.listService = new ListService(props)
  }

  async componentDidMount() {
    const res = await this.listService.getList();

    console.log('@@@@ res', res)

    if(res) {
      this.setState({
        list: res
      })
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <NaviBar
          title={'List列表页'}
          onBack={history.goBack.bind(this, this)}
        />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Home页传过来的name:{this.state.name}</Text>
          <TouchableOpacity style={styles.button} onPress={() => history.push(this, '/detail', {name: 'suannai'})}>
            <Text style={styles.buttonText}>跳转到Detail</Text>
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