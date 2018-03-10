import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Icon, Button } from 'react-native-elements';

import { observable } from 'mobx';
import { observer, Provider } from 'mobx-react';

import Colors from '../styles/Colors';
import userStore from '../store/UserStore';

@observer
class LoginScreen extends Component {
  @observable loginAction = true;
  @observable text = '';

  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => ({
    title: '个人中心',
    header: null,
    tabBarVisible: navigation.state.params
      ? navigation.state.params.tabBarVisible
      : true,
    tabBarIcon: ({ focused, tintColor }) => {
      if (focused) {
        return <Icon name="people" color={tintColor} />;
      } else {
        return <Icon name="people" color={Colors.text} />;
      }
    }
  });

  handleInputFocus() {
    this.props.navigation.setParams({
      tabBarVisible: false
    });
  }

  render() {
    return (
      <View style={Styles.container}>
        <Text>{this.text}</Text>
        <View style={{ width: 300, height: 200 }}>
          <Text style={{ textAlign: 'center', fontSize: 20 }}>登录</Text>
          <View style={Styles.InputStyle}>
            <TextInput
              placeholder="邮箱"
              icon={<Icon name="user" size={24} color="black" />}
              onFocus={() => this.handleInputFocus()}
            />
          </View>
          <View style={Styles.InputStyle}>
            <TextInput
              placeholder="密码"
              icon={<Icon name="user" size={24} color="black" />}
              onFocus={() => this.handleInputFocus()}
            />
          </View>
        </View>
        <Text style={Styles.toggleText}>
          {this.loginAction ? '注册账号' : '登录'}
        </Text>
        <Button
          text={this.loginAction ? '登录' : '注册'}
          loading={false}
          loadingProps={{ size: 'large', color: 'rgba(111, 202, 186, 1)' }}
          textStyle={{ fontWeight: '700' }}
          buttonStyle={Styles.actionButton}
          containerStyle={{ marginTop: 20 }}
        />
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  toggleText: {
    width: 300,
    height: 40,
    fontSize: 16,
    textAlign: 'right',
    color: Colors.link
  },
  actionButton: {
    backgroundColor: Colors.button,
    width: 100,
    height: 45,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5
  },
  InputStyle: {
    marginTop: 20,
    padding: 5,
    width: 300,
    height: 50,
    borderWidth: 0.5,
    borderColor: Colors.border
  }
});

export default LoginScreen;
