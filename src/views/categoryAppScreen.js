/*
 * @Author: wuyiqing 
 * @Date: 2018-03-08 23:44:24 
 * @Last Modified by: wuyiqing
 * @Last Modified time: 2018-03-11 22:04:32
 * 分类的应用列表
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import { observable } from 'mobx';
import { observer, Provider } from 'mobx-react';

import categoryStore from '../store/CategoryStore';
import userStore from '../store/UserStore';
import appStore from '../store/AppStore';
import List from '../components/List';
import { getData } from '../utils/storage';

@observer
class CategoryAppScreen extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
    tabBarVisible: false
  });

  // 加载应用文章列表
  handleLoadArticleList(app) {
    appStore.setCurrentApp(app);
    appStore.fetchArticleList().then(res => console.log(res));
    this.props.navigation.navigate('ArticleList', { title: app.title });
  }

  // 处理应用关注
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
    const { appList, categoryTitle } = categoryStore;
    return (
      <Provider categoryStore={categoryStore}>
        <View>
          <List
            data={appList}
            followIcon={true}
            titleOnPress={app => this.handleLoadArticleList(app)}
            followIconOnPress={app => this.handleFollowApp(app)}
          />
        </View>
      </Provider>
    );
  }
}

export default CategoryAppScreen;
