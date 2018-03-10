import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Icon, Button, Overlay } from 'react-native-elements';

import Colors from '../styles/Colors';

class Dialog extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isVisible, text, confirmAction } = this.props;
    return (
      <Overlay
        containerStyle={{
          alignItems: 'center',
          justifyContent: 'center'
        }}
        isVisible={isVisible}
        width={200}
        height={150}
      >
        <Text style={{ flex: 1, fontSize: 18, margin: 20 }}>{text}</Text>
        <Button
          text="确定"
          buttonStyle={Styles.actionButton}
          onPress={confirmAction}
        />
      </Overlay>
    );
  }
}

const Styles = StyleSheet.create({
  actionButton: {
    backgroundColor: Colors.button,
    width: 60,
    height: 30,
    borderColor: 'transparent',
    borderWidth: 0,
    marginBottom: 10
  }
});

export default Dialog;
