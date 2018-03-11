/*
 * @Author: wuyiqing 
 * @Date: 2018-03-11 12:57:50 
 * @Last Modified by: wuyiqing
 * @Last Modified time: 2018-03-11 22:50:20
 * 小卡片列表，展示用户收藏数据等
 */

import React, { Component } from 'react';
import { ScrollView, FlatList, View, StyleSheet, Text } from 'react-native';
import { List, ListItem, Card, Avatar } from 'react-native-elements';
import { observer } from 'mobx-react';

import userStore from '../store/UserStore';
import appStore from '../store/AppStore';
import Colors from '../styles/Colors';
import { formatTime } from '../utils';
import { getData } from '../utils/storage';

const AppView = ({ item, onPress }) => (
  <View style={Styles.ListItem}>
    <Card containerStyle={Styles.cardStyle}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Avatar
          medium
          rounded
          source={{
            uri: item.imageURL
          }}
        />
        <View style={{ flex: 1 }}>
          <Text style={Styles.titleStyle}>{item.title}</Text>
          <Text style={Styles.TextStyle}>{item.description}</Text>
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Text style={{ color: Colors.link }} onPress={onPress}>
            取消关注
          </Text>
        </View>
      </View>
    </Card>
  </View>
);

const ArticleView = ({ item }) => (
  <View style={Styles.ListItem}>
    <Card
      title={item.title}
      titleStyle={Styles.titleStyle}
      containerStyle={Styles.cardStyle}
    >
      <Text style={Styles.TextStyle}>
        {item.summary && item.summary.slice(0, 64)}
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={Styles.TextStyle}>{formatTime(item.time)}</Text>
        <Text style={[Styles.TextStyle, { color: Colors.link }]}>取消收藏</Text>
      </View>
    </Card>
  </View>
);

@observer
class CardList extends Component {
  constructor(props) {
    super(props);
  }

  async cancelFollowApp(app) {
    const account = await getData('account');
    if (!account.username) {
      appStore.showDialog('你还没有登录，不能关注应用');
      return;
    }
    userStore.cancelUserFollowApp(app).then(res => {
      if (res.status) {
        appStore.showDialog('取消关注成功');
      } else {
        appStore.showDialog(res.error);
      }
    });
  }

  renderItem(type, item) {
    return type ? (
      <AppView item={item} onPress={() => this.cancelFollowApp(item)} />
    ) : (
      <ArticleView item={item} />
    );
  }

  render() {
    const { collectArticles, followApps } = userStore;
    const { type } = this.props;
    const data = type ? followApps : collectArticles;
    return (
      <ScrollView contentContainerStyle={Styles.ScrollView}>
        <View>
          <FlatList
            data={data}
            renderItem={({ item }) => this.renderItem(type, item)}
          />
        </View>
      </ScrollView>
    );
  }
}

const Styles = StyleSheet.create({
  ListItem: {
    margin: 5
  },
  cardStyle: {
    borderWidth: 0,
    elevation: 4,
    padding: 10,
    borderRadius: 5
  },
  titleStyle: {
    textAlign: 'left',
    fontSize: 18,
    marginLeft: 10,
    marginRight: 10
  },
  TextStyle: {
    marginLeft: 10,
    lineHeight: 30
  },
  ScrollView: {
    paddingBottom: 60
  },
  CategoryTitle: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 18
  }
});

export default CardList;
