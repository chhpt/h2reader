/*
 * @Author: wuyiqing 
 * @Date: 2018-03-08 23:44:24 
 * @Last Modified by: wuyiqing
 * @Last Modified time: 2018-03-09 18:57:25
 * 分类的应用列表
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import { observable } from 'mobx';
import { observer, Provider } from 'mobx-react';

import categoryStore from '../store/CategoryStore';
import appStore from '../store/AppStore';
import List from '../components/List';

@observer
class CategoryAppScreen extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
    tabBarVisible: false
  });

  handleLoadArticleList(app) {
    appStore.setCurrentApp(app);
    appStore.fetchArticleList();
    this.props.navigation.navigate('ArticleList', { title: app.title });
  }

  render() {
    const { categoryApps, categoryTitle } = categoryStore;
    return (
      <Provider categoryStore={categoryStore}>
        <View>
          <List
            data={categoryApps.slice(0)}
            followIcon={true}
            titleOnPress={app => this.handleLoadArticleList(app)}
          />
        </View>
      </Provider>
    );
  }
}

export default CategoryAppScreen;
