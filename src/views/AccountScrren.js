import React, { Component } from 'react';
import { StyleSheet, View, Button, Text, AsyncStorage } from 'react-native';
import { Icon } from 'react-native-elements';
import { observable } from 'mobx';
import { observer, Provider } from 'mobx-react';

import Colors from '../styles/Colors';
import { getData, saveData } from '../utils/storage';

@observer
class AccountScreen extends Component {
  @observable
  account = {
    username: ''
  };

  constructor(props) {
    super(props);
  }

  async componentWillMount() {
    try {
      const account = await getData('account');
      this.account = account || {};
      return;
    } catch (error) {
      console.log(error);
    }
    this.props.navigation.navigate('Login');
  }

  static navigationOptions = {
    title: '个人中心',
    header: null,
    tabBarIcon: ({ focused, tintColor }) => {
      if (focused) {
        return <Icon name="people" color={tintColor} />;
      } else {
        return <Icon name="people" color={Colors.text} />;
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>个人中心</Text>
          <Text>{this.account.username}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default AccountScreen;
