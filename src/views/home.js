import React, { Component } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { Icon } from 'react-native-elements';

import Colors from '../styles/Colors';
import AppList from '../components/AppList';
import appStore from '../store/AppStore';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  static navigationOptions = {
    title: '首页',
    header: null,
    tabBarIcon: ({ focused, tintColor }) => {
      if (focused) {
        return <Icon name="home" color={tintColor} />;
      } else {
        return <Icon name="home" color={Colors.text} />;
      }
    }
  };

  loadArticleList(app) {
    // 记录当前应用
    appStore.setCurrentApp(app);
    // 获取文章列表
    appStore.fetchArticleList();
    this.props.navigation.navigate('HomeArticleList', { title: app.title });
  }

  render() {
    return (
      <View style={styles.container}>
        <AppList onPress={app => this.loadArticleList(app)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

export default HomeScreen;
