import React, { Component } from 'react';
import { View, Text, BackHandler } from 'react-native';
import { Icon } from 'react-native-elements';
import { observable } from 'mobx';
import { observer, Provider } from 'mobx-react';

import Colors from '../styles/Colors';
import HeaderSearchBar from '../components/HeaderSearchBar';
import categoryStore from '../store/CategoryStore';
import appStore from '../store/AppStore';
import userStore from '../store/UserStore';
import List from '../components/List';
import { getData } from '../utils/storage';


@observer
class SearchScreen extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: '搜索',
    headerStyle: {
      height: 0
    },
    tabBarVisible: false
  };

  // 加载应用文章列表
  handleLoadArticleList(app) {
    appStore.setCurrentApp(app);
    appStore.fetchArticleList();
    this.props.navigation.navigate('ArticleList', { title: app.title });
  }

  async handleFollowApp(app) {
    const account = await getData('account');
    if (!account.username) {
      appStore.showDialog('你还没有登录，不能关注应用');
      return;
    }
    if (!app.followed) {
      userStore.userFollowApp(app).then(res => {
        if (res.status) {
          appStore.showDialog('关注应用成功');
        } else {
          appStore.showDialog(res.error);
        }
      });
    } else {
      userStore.cancelUserFollowApp(app).then(res => {
        if (res.status) {
          appStore.showDialog('取消关注成功');
        } else {
          appStore.showDialog(res.error);
        }
      });
    }
  }

  render() {
    const { searchAppList } = categoryStore;
    return (
      <Provider categoryStore={categoryStore}>
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
          <HeaderSearchBar />
          <List
            data={searchAppList}
            followIcon={true}
            titleOnPress={app => this.handleLoadArticleList(app)}
            followIconOnPress={app => this.handleFollowApp(app)}
          />
        </View>
      </Provider>
    );
  }
}

export default SearchScreen;
