import React, { Component } from 'react';
import { View, StyleSheet, ProgressBarAndroid } from 'react-native';
import { Icon, Button, Text, SearchBar } from 'react-native-elements';
import { observable } from 'mobx';
import { observer, Provider } from 'mobx-react';

import Colors from '../styles/Colors';
import List from '../components/List';
import categoryStore from '../store/CategoryStore';
import userStore from '../store/UserStore';

@observer
class SearchScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categoryStore: null
    };
  }

  componentWillMount() {
    if (!categoryStore.category.length) {
      categoryStore.fetchCategories();
    }
    if (!userStore.followApps.length) {
      userStore.fetchFollowApps();
    }
  }

  static navigationOptions = {
    title: '搜索',
    headerStyle: {
      height: 0
    },
    tabBarIcon: ({ focused, tintColor }) => {
      if (focused) {
        return <Icon name="search" color={tintColor} />;
      } else {
        return <Icon name="search" color={Colors.text} />;
      }
    }
  };

  handleFocus() {
    this.props.navigation.navigate('SearchDetail');
  }

  handleListPress(title) {
    const filter = userStore.followApps.length;
    categoryStore.loadCategoryApps(title, filter);
    this.props.navigation.navigate('CategoryApp', { title });
  }

  render() {
    const { category } = categoryStore;
    return (
      <Provider categoryStore={categoryStore}>
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <SearchBar
            round
            lightTheme
            placeholder="Search"
            value={null}
            onFocus={() => this.handleFocus()}
            inputStyle={{ backgroundColor: '#fff', fontSize: 16 }}
          />
          <List
            detailIcon={true}
            data={category}
            title="所有分类"
            titleOnPress={item => this.handleListPress(item.title)}
            listOnPress={title => this.handleListPress(title)}
          />
        </View>
      </Provider>
    );
  }
}

export default SearchScreen;
