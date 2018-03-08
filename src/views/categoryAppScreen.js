/*
 * @Author: wuyiqing 
 * @Date: 2018-03-08 23:44:24 
 * @Last Modified by: wuyiqing
 * @Last Modified time: 2018-03-08 23:50:26
 * 分类的应用列表
 */


import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { observable } from 'mobx';
import { observer, Provider } from 'mobx-react';

import categoryStore from '../store/CategoryStore';
import List from '../components/List';

@observer
class CategoryAppScreen extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    headerStyle: {
      height: 0
    },
    tabBarVisible: false,
  };

  render() {
    const {categoryApps} = categoryStore;
    return (
      <Provider categoryStore={categoryStore}>
        <View>
          <List data={categoryApps.slice(0)} icons={false}/>
        </View>
      </Provider>
    );
  }
}

export default CategoryAppScreen;
