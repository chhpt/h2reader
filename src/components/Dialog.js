import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Icon, Button, Overlay } from 'react-native-elements';
import { observable } from 'mobx';
import { observer, Provider } from 'mobx-react';

import Colors from '../styles/Colors';
import appStore from '../store/AppStore';

@observer
class Dialog extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Overlay
        containerStyle={{
          alignItems: 'center',
          justifyContent: 'center'
        }}
        isVisible={appStore.dialogVisible}
        width={240}
        height={150}
      >
        <Text style={{ flex: 1, fontSize: 18, margin: 20 }}>
          {appStore.dialogText}
        </Text>
        <Button
          text="确定"
          buttonStyle={Styles.actionButton}
          onPress={() => {
            appStore.hideDialog();
          }}
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
