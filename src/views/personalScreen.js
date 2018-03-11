import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import { observable } from 'mobx';
import { observer, Provider } from 'mobx-react';

import Colors from '../styles/Colors';
import userStore from '../store/UserStore';
import { getData } from '../utils/storage';

const UnLoginView = ({ onPress }) => (
  <View>
    <Avatar
      large
      rounded
      source={{
        uri:
          'http://img.hb.aicdn.com/f03f7962fc1e33c58208f7cbbb66a8c65b8367097d5d-l6CY0w_fw658'
      }}
      onPress={onPress}
    />
    <Text
      onPress={onPress}
      style={{
        fontSize: 20,
        color: '#fff',
        marginTop: 20,
        textAlign: 'center'
      }}
    >
      登录
    </Text>
  </View>
);

@observer
class PersonalScreen extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  static navigationOptions = {
    title: '个人中心',
    header: null,
    tabBarIcon: ({ focused, tintColor }) => {
      if (focused) {
        return <Icon name="person" color={tintColor} />;
      } else {
        return <Icon name="person" color={Colors.text} />;
      }
    }
  };

  _bootstrapAsync = async () => {
    const account = userStore.account.username
      ? userStore.account
      : await getData('account');
    console.log(account);
    if (account.username) {
      this.props.navigation.navigate('Account');
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Image
          style={{ flex: 1 }}
          source={{
            uri:
              'http://img.hb.aicdn.com/716fae1f349cf03cc36ee744c0391079e4cb09cb35a14-ebLY50_fw658'
          }}
        />
        <View style={Styles.viewWrapper}>
          <UnLoginView
            onPress={() => this.props.navigation.navigate('Login')}
          />
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  viewWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
});

export default PersonalScreen;
