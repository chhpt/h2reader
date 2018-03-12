import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Easing } from 'react-native';

import Colors from '../styles/Colors';
import Metrics from '../styles/Metrics';

export default class LaunchScreen extends Component {
  constructor(props) {
    super(props);
    const animatedValue = new Animated.Value(0.2);
    this.state = {
      title: '一花一世界，\n一叶一菩提。',
      animatedValue,
      fadeOutAnimated: Animated.timing(animatedValue, {
        toValue: 1, // 透明度动画最终值
        duration:  2000, // 动画时长3000毫秒
        easing: Easing.linear
      })
    };
  }

  static navigationOptions = {
    headerStyle: {
      height: 0
    }
  };

  componentDidMount() {
    this.state.fadeOutAnimated.start(() =>
      this.state.animatedValue.setValue(0.2)
    );
  }

  render() {
    const { animatedValue } = this.state;
    const bottom = this.state.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 200, 0]
    });

    return (
      <Animated.View style={[Styles.launchTitle, { opacity: animatedValue }]}>
        <View>
          <Text style={Styles.launchTitleText}>{this.state.title}</Text>
        </View>
      </Animated.View>
    );
  }
}

const Styles = StyleSheet.create({
  launchTitle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  launchTitleText: {
    color: '#595959',
    fontSize: 32,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: Colors.ember,
    lineHeight: 60,
    padding: 40,
    alignItems: 'center',
    textAlign: 'center'
  }
});
