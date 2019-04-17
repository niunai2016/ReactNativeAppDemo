import React, { Component } from 'react'
import {View, Dimensions, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import LoadingAnimation from '../assets/animations/loading';

const { width, height } = Dimensions.get('window')

export default class Loading extends Component {
  render(){
    if(this.props.visible){
      return (
        <View style={styles.wrapper}>
          <View style={styles.loading}>
            <LottieView source={LoadingAnimation} autoPlay={this.props.visible} loop={this.props.visible} />
          </View>
        </View>
      )
    }else{
      return <View/>
    }
  }
}

const styles = StyleSheet.flatten({
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  loading:{
    position: 'absolute',
    top: height / 2 - 100,
    left: width / 2 - 70,
    width: 140,
    height: 140
  }
});