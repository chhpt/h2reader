import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { observable } from 'mobx';
import { observer, Provider } from 'mobx-react';

import Colors from '../styles/Colors';
import HeaderSearchBar from '../components/HeaderSearchBar';
import categoryStore from '../store/CategoryStore';
import appStore from '../store/AppStore';
import List from '../components/List';

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

  componentDidMount() {}

  handleLoadArticleList(app) {
    appStore.setCurrentApp(app);
    appStore.fetchArticleList();
    this.props.navigation.navigate('ArticleList', { title: app.title });
  }

  render() {
    const { searchResult } = categoryStore;
    return (
      <Provider categoryStore={categoryStore}>
        <View>
          <HeaderSearchBar />
          <List
            data={searchResult.slice(0)}
            followIcon={true}
            titleOnPress={app => this.handleLoadArticleList(app)}
          />
        </View>
      </Provider>
    );
  }
}

export default SearchScreen;
