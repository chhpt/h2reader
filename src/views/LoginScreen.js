import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Keyboard } from 'react-native';
import { Icon, Button, Overlay } from 'react-native-elements';

import { observable } from 'mobx';
import { observer, Provider } from 'mobx-react';

import Dialog from '../components/Dialog';
import Colors from '../styles/Colors';
import userStore from '../store/UserStore';
import { validateEmail } from '../utils';

// TextInput 包装
const Input = ({
  placeholder,
  hasButton,
  iconName,
  onChangeText,
  buttonLoading,
  buttonOnPress,
  buttonText,
  secureTextEntry
}) => (
  <View style={Styles.InputWrapper}>
    <Icon
      name={iconName}
      iconStyle={{ marginRight: 10 }}
      size={20}
      type="font-awesome"
    />
    <TextInput
      underlineColorAndroid="transparent"
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      style={{ flex: 1, padding: 0 }}
      onChangeText={text => onChangeText(text)}
    />
    {hasButton && (
      <Button
        text={buttonText}
        loading={buttonLoading}
        loadingProps={{ size: 'large', color: 'rgba(111, 202, 186, 1)' }}
        textStyle={{ fontWeight: '400', fontSize: 15, color: Colors.link }}
        buttonStyle={Styles.InputButton}
        containerStyle={{ marginRight: 10 }}
        onPress={buttonOnPress}
      />
    )}
  </View>
);

@observer
class LoginScreen extends Component {
  @observable loginAction = true;
  @observable text = '';
  @observable
  account = {
    username: '',
    email: '',
    password: '',
    code: ''
  };

  @observable dialogVisible = false;
  @observable dialogText = '';
  @observable codeLoading = false;
  @observable sendCodeText = '发送验证码';
  @observable actionLoading = false;

  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => ({
    header: null,
    tabBarVisible: false
  });

  // 切换登录和注册功能
  toggleActio() {
    this.loginAction = !this.loginAction;
  }

  showDialog(text) {
    Keyboard.dismiss();
    this.dialogText = text;
    this.dialogVisible = true;
  }

  validateAccount() {
    const textMap = {
      username: '用户名',
      password: '密码',
      email: '邮箱',
      code: '验证码'
    };
    let flag = 0;
    const whiteList = ['username', 'code'];
    Object.keys(this.account).some(key => {
      // 登录时不验证用户名和验证码
      if (this.loginAction && whiteList.includes(key)) {
        return false;
      }
      if (!this.account[key]) {
        this.showDialog(`${textMap[key]}不能为空`);
        falg++;
        return true;
      }
    });
    // 某项为空，返回
    if (flag) return false;

    const valid = validateEmail(this.account.email);
    if (!valid) {
      this.showDialog('邮箱格式错误');
      return false;
    }
    if (this.account.password.length < 8) {
      this.showDialog('密码长度不能小于 8 位');
      return false;
    }
    return true;
  }

  // 发送验证码
  async sendCode() {
    if (!this.account.email) {
      this.showDialog('邮箱不能为空');
      return false;
    }
    if (!validateEmail(this.account.email)) {
      this.showDialog('邮箱格式错误');
      return false;
    }
    this.codeLoading = true;
    const res = await userStore.sendCode(this.account.email);
    if (res.status) {
      this.codeLoading = false;
      this.sendCodeText = '验证码已发送';
    }
  }

  // 登录或注册处理
  handleAction() {
    this.loginAction ? this.userLogin() : this.userRegister();
  }

  // 登录成功跳转
  handleActionSuccess(text) {
    this.actionLoading = false;
    this.showDialog(`${text} \n 跳转中...`);
    setTimeout(() => {
      this.props.navigation.navigate('Account');
    }, 1000);
  }

  async userRegister() {
    const valid = this.validateAccount();
    if (valid) {
      this.actionLoading = true;
      Keyboard.dismiss();
      const res = await userStore.register(this.account);
      if (res.status) {
        this.handleActionSuccess('注册成功');
      } else {
        this.showDialog(res.error);
      }
    }
    return false;
  }

  async userLogin() {
    const valid = this.validateAccount();
    if (valid) {
      this.actionLoading = true;
      Keyboard.dismiss();
      const res = await userStore.login(this.account);
      if (res.status) {
        this.handleActionSuccess('登录成功');
      } else {
        this.showDialog(res.error);
      }
    }
    return false;
  }

  render() {
    return (
      <View style={Styles.container}>
        <Text>{this.text}</Text>
        <View style={{ width: 280 }}>
          <Text style={{ textAlign: 'center', fontSize: 20 }}>
            {this.loginAction ? '登录' : '注册'}
          </Text>
          {/* 输入框 */}
          {!this.loginAction && (
            <Input
              iconName="user"
              placeholder="用户名"
              onChangeText={text => (this.account.username = text)}
            />
          )}
          <Input
            iconName="envelope"
            placeholder="邮箱"
            onChangeText={text => (this.account.email = text)}
          />
          <Input
            iconName="key"
            placeholder="密码"
            secureTextEntry={true}
            onChangeText={text => (this.account.password = text)}
          />
          {!this.loginAction && (
            <Input
              iconName="check-circle"
              placeholder="验证码"
              buttonText={this.sendCodeText}
              hasButton={true}
              buttonLoading={this.codeLoading}
              onChangeText={text => (this.account.code = text)}
              buttonOnPress={() => this.sendCode()}
            />
          )}
        </View>

        <Text style={Styles.toggleText} onPress={() => this.toggleActio()}>
          {this.loginAction ? '注册账号' : '登录'}
        </Text>
        <Button
          text={this.loginAction ? '登录' : '注册'}
          loading={this.actionLoading}
          loadingProps={{ size: 'large', color: 'rgba(111, 202, 186, 1)' }}
          textStyle={{ fontWeight: '700' }}
          buttonStyle={Styles.actionButton}
          containerStyle={{ marginTop: 10 }}
          onPress={() => this.handleAction()}
        />
        <Dialog
          isVisible={this.dialogVisible}
          text={this.dialogText}
          confirmAction={() => (this.dialogVisible = false)}
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
    width: 280,
    height: 40,
    fontSize: 16,
    marginTop: 20,
    textAlign: 'right',
    color: Colors.link
  },
  actionButton: {
    backgroundColor: Colors.button,
    width: 100,
    height: 45,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 25
  },
  InputLable: { width: 60, height: 20, fontSize: 16 },
  InputWrapper: {
    marginTop: 20,
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: 280,
    height: 48,
    borderWidth: 1,
    borderRadius: 24,
    borderColor: Colors.border
  },
  InputButton: {
    borderWidth: 0,
    backgroundColor: '#fff'
  }
});

export default LoginScreen;
