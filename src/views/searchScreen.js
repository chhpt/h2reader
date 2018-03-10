import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon, Button, Text, SearchBar } from 'react-native-elements';
import { observable } from 'mobx';
import { observer, Provider } from 'mobx-react';

import Colors from '../styles/Colors';
import List from '../components/List';
import categoryStore from '../store/CategoryStore';

@observer
class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryStore: null
    };
  }

  componentDidMount() {
    if (!categoryStore.category.length) {
      categoryStore.fetchCategories();
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
    // this.search.blur();
  }

  handleListPress(title) {
    categoryStore.loadCategoryApps(title);
    this.props.navigation.navigate('CategoryApp', { title });
  }

  render() {
    const { category } = categoryStore;
    return (
      <Provider categoryStore={categoryStore}>
        <View>
          <SearchBar
            round
            lightTheme
            placeholder="Search"
            ref={search => this.search = search}
            onFocus={() => this.handleFocus()}
            inputStyle={{ backgroundColor: '#fff', fontSize: 16 }}
          />
          <List
            detailIcon={true}
            data={category}
            title="所有分类"
            listOnPress={title => this.handleListPress(title)}
          />
        </View>
      </Provider>
    );
  }
}

export default SearchScreen;
