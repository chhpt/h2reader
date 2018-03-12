import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  Image,
  BackHandler
} from 'react-native';
import { Icon, Card, Overlay } from 'react-native-elements';
import { observable } from 'mobx';
import { observer, Provider } from 'mobx-react';

import userStore from '../store/UserStore';
import appStore from '../store/AppStore';
import Colors from '../styles/Colors';
import { getData } from '../utils/storage';
import backgroundPic from '../utils/backPicLinks';
import TabLayout from '../components/TabLayout';
import CardList from '../components/CradList';

const UserInfoView = ({ account, onPress }) => (
  <View style={{ flex: 1, justifyContent: 'center' }}>
    <Text style={Styles.userInfoText}>{account.username}</Text>
    <Text style={Styles.userInfoText}>{account.email}</Text>
    <Text
      style={[Styles.userInfoText, { color: Colors.link }]}
      onPress={onPress}
    >
      退出登录
    </Text>
  </View>
);

@observer
class AccountScreen extends Component {
  @observable
  account = {
    username: '测试'
  };

  constructor(props) {
    super(props);
    this.state = {
      routes: [
        { key: 'first', title: '收藏' },
        { key: 'second', title: '关注' },
        { key: 'third', title: '个人信息' }
      ]
    };
  }

  async componentWillMount() {
    try {
      const account = await getData('account');
      if (!account) {
        this.props.navigation.navigate('Login');
        return;
      }
      userStore.fetchCollectArticles().then(res => {
        // 错误提示
        if (!res.status) {
          appStore.showDialog(res.error);
        }
      });
      userStore.fetchFollowApps();
      this.account = account || {};
    } catch (error) {
      this.account = {};
      this.props.navigation.navigate('Login');
    }
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

  showDialog(text) {
    appStore.showDialog(text);
  }

  async handleLogout() {
    await userStore.logout();
    this.props.navigation.navigate('Personal');
  }

  renderScene(index, route) {
    // 为了能在切换 tab 数据能及时响应，使用了 observe 的 card 组件
    if (index === 0) {
      userStore.fetchCollectArticles();
      return <CardList type={0} />;
    }
    if (index === 1) {
      userStore.fetchFollowApps();
      return <CardList type={1} />;
    }
    if (index === 2) {
      return (
        <UserInfoView
          account={this.account}
          onPress={() => this.handleLogout()}
        />
      );
    }
    return null;
  }

  render() {
    return (
      <View style={Styles.container}>
        <View style={{ height: 200, backgroundColor: '#000' }}>
          {/* 背景卡片 */}
          <Card height={200} containerStyle={Styles.cardStyle}>
            <View style={{ opacity: 0.7 }}>
              <Image
                style={{ height: 200 }}
                source={{
                  uri:
                    backgroundPic[
                      parseInt(Math.random() * backgroundPic.length)
                    ]
                }}
              />
            </View>
            <Text style={Styles.cardTextStyle}>{this.account.username}</Text>
          </Card>
        </View>

        <View style={{ flex: 1 }}>
          <TabLayout
            routes={this.state.routes}
            renderScene={(index, route) => this.renderScene(index, route)}
          />
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  cardStyle: {
    borderWidth: 0,
    elevation: 2,
    padding: 0,
    margin: 0,
    backgroundColor: '#000'
  },
  userInfoText: {
    fontSize: 18,
    margin: 10,
    marginRight: 30,
    textAlign: 'right'
  },
  cardTextStyle: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    fontSize: 24,
    color: '#fff'
  }
});

export default AccountScreen;
