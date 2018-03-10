/*
 * @Author: wuyiqing 
 * @Date: 2018-03-09 17:00:48 
 * @Last Modified by: wuyiqing
 * @Last Modified time: 2018-03-09 18:17:14
 * 应用文章列表展示
 */

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { observable } from 'mobx';
import { observer, Provider } from 'mobx-react';

import appStore from '../store/AppStore';
import ArticleList from '../components/ArticleList';

@observer
class ArticleListScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
    tabBarVisible: false
  });

  render() {
    const { articleList } = appStore;
    return (
      <View>
        <ArticleList data={articleList.slice(0)} />
      </View>
    );
  }
}

export default ArticleListScreen;
