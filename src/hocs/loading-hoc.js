import React, {Component} from 'react';
import {Dimensions, View} from 'react-native';
const { width, height } = Dimensions.get('window')
import Event from '../common/event'

export default function LoadingHoc(WrappedComponent) {
  return class ComposedComponent extends Component {
    showLoading(){
      Event.emit('SHOW_LOADING')
    }

    hideLoading(){
      Event.emit('HIDE_LOADING')
    }

    render() {
      const props = {...this.props, ...{
          showLoading: this.showLoading.bind(this),
          hideLoading: this.hideLoading.bind(this)
        }};
      return (
        <View style={{width, height}}>
          <WrappedComponent  {...props} />
        </View>
      );
    }
  };
}
