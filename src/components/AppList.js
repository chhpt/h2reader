/*
 * @Author: wuyiqing 
 * @Date: 2018-03-11 22:55:40 
 * @Last Modified by: wuyiqing
 * @Last Modified time: 2018-03-13 15:10:03
 * 首页 APP 展示列表
 */

/*
 * @Author: wuyiqing 
 * @Date: 2018-03-11 12:57:50 
 * @Last Modified by: wuyiqing
 * @Last Modified time: 2018-03-11 22:50:20
 * 小卡片列表，展示用户收藏数据等
 */

import React, { Component } from 'react';
import {
  ScrollView,
  FlatList,
  View,
  StyleSheet,
  Text,
  Dimensions
} from 'react-native';
import { List, ListItem, Card, Avatar } from 'react-native-elements';
import { observer } from 'mobx-react';

import userStore from '../store/UserStore';
import appStore from '../store/AppStore';
import Colors from '../styles/Colors';
import { formatTime } from '../utils';
import { getData } from '../utils/storage';

const { width } = Dimensions.get('window');

@observer
class AppList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (!userStore.followApps.length) {
      userStore.fetchFollowApps();
    }
  }

  renderItem(item) {
    if (!item || !item.length) {
      return;
    }
    return (
      <View style={Styles.listWrapper}>
        {item.map(app => (
          <View style={Styles.appWrapper} key={app.title}>
            <Avatar
              width={60}
              height={60}
              rounded
              source={{
                uri: app.imageURL
              }}
              onPress={() => this.props.onPress(app)}
            />
            <Text
              style={Styles.appTitle}
              onPress={() => this.props.onPress(app)}
            >
              {app.title}
            </Text>
          </View>
        ))}
      </View>
    );
  }

  // 对应用进行划分处理，三个一列
  sliceApps(apps) {
    const result = [];
    const length =
      apps.length % 3 === 0 ? apps.length / 3 : apps.length / 3 + 1;
    for (let i = 0; i < length; i++) {
      result.push(apps.splice(0, 3));
    }
    return result;
  }

  render() {
    const { followApps } = userStore;
    const data = this.sliceApps(followApps.slice(0));
    return (
      <View style={{ flex: 1}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => this.renderItem(item)}
        />
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  listWrapper: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 24,
    marginRight: 24,
    marginTop: 20,
    marginBottom: 20
  },
  appWrapper: {
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    width: (width - 168) / 3
  },
  appTitle: {
    marginTop: 18,
    fontSize: 16,
    fontWeight: '500',
    width: 80,
    color: '#000',
    textAlign: 'center'
  }
});

export default AppList;
