import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

import Styles from '../styles/launchScreen';

export default class LaunchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '一花一世界，\n一叶一菩提。'
    };
  }

  static navigationOptions = {
    headerStyle: {
      height: 0
    }
  };

  render() {
    return (
      <View style={Styles.launchTitle}>
        <View>
          <Text style={Styles.launchTitleText}>{this.state.title}</Text>
        </View>
      </View>
    );
  }
}
