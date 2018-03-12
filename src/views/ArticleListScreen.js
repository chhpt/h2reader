/*
 * @Author: wuyiqing 
 * @Date: 2018-03-09 17:00:48 
 * @Last Modified by: wuyiqing
 * @Last Modified time: 2018-03-12 18:46:21
 * 应用文章列表展示
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  ProgressBarAndroid,
  StyleSheet,
  ScrollView
} from 'react-native';
import { Icon, Card } from 'react-native-elements';
import { observable } from 'mobx';
import { observer, Provider } from 'mobx-react';

import appStore from '../store/AppStore';
import ArticleList from '../components/ArticleList';
import Colors from '../styles/Colors';

const Loading = () => (
  <Card containerStyle={Styles.loadWrapper}>
    <ProgressBarAndroid
      styleAttr="Inverse"
      color={Colors.loading}
      style={{
        width: 30,
        height: 30
      }}
    />
  </Card>
);

@observer
class ArticleListScreen extends Component {
  @observable page = 0;

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
    tabBarVisible: false
  });

  loadArticle(article) {
    appStore.fetchArticle(article);
    this.props.navigation.navigate('Article');
  }

  loadMoreArticles(id) {
    if (appStore.loading) return;
    appStore.fetchMoreArticles(id, ++this.page);
  }

  render() {
    const { articleList, loading, firstLoading } = appStore;
    // 最后一篇文章的 id
    const id = articleList.length && articleList.slice(0).pop().id;
    return (
      <View style={Styles.root}>
        {/* 加载动画 */}
        {/* {loading && <Loading />} */}
        {firstLoading && <Loading />}
        <ArticleList
          data={articleList.slice(0)}
          onEndReached={() => this.loadMoreArticles(id)}
          cardOnPress={article => this.loadArticle(article)}
          Loading={<Loading />}
        />
        {loading && <Loading />}
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  loadWrapper: {
    width: 40,
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    elevation: 4,
    padding: 5,
    borderRadius: 20
  }
});
export default ArticleListScreen;
