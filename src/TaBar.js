import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Modal } from 'react-native';

import { Styles } from './styles';

export default class componentName extends Component {
  render() {
    return (
      <View style={Styles.tabBar}>
        <Button title="首页" />
        <Button title="我的" />
      </View>
    );
  }
}
