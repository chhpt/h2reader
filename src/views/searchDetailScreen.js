import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { observable } from 'mobx';
import { observer, Provider } from 'mobx-react';

import Colors from '../styles/Colors';
import SearchBar from '../components/SearchBar';
import categoryStore from '../store/CategoryStore';
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

  render() {
    const {searchResult} = categoryStore;
    return (
      <Provider categoryStore={categoryStore}>
        <View>
          <SearchBar />
          <List data={searchResult.slice(0)} icons={false}/>
        </View>
      </Provider>
    );
  }
}

export default SearchScreen;
