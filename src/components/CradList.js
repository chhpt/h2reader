/*
 * @Author: wuyiqing 
 * @Date: 2018-03-11 12:57:50 
 * @Last Modified by: wuyiqing
 * @Last Modified time: 2018-03-12 19:31:38
 * 小卡片列表，展示用户收藏数据等
 */

import React, { Component } from 'react';
import { FlatList, View, StyleSheet, Text, Linking } from 'react-native';
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

const ArticleView = ({ item, onPress, titleOnPress }) => (
  <View style={Styles.ListItem}>
    <Card containerStyle={Styles.cardStyle}>
      <Text style={Styles.titleStyle} onPress={() => titleOnPress(item.url)}>
        {item.title}
      </Text>
      <Text style={Styles.TextStyle}>
        {item.summary && item.summary.slice(0, 64)}
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={Styles.TextStyle}>{formatTime(item.time)}</Text>
        <Text
          style={[Styles.TextStyle, { color: Colors.link }]}
          onPress={onPress}
        >
          取消收藏
        </Text>
      </View>
    </Card>
  </View>
);

@observer
class CardList extends Component {
  constructor(props) {
    super(props);
  }

  openLink(url) {
    Linking.openURL(url);
  }

  async cancelFollowApp(app) {
    userStore.cancelUserFollowApp(app).then(res => {
      if (res.status) {
        appStore.showDialog('已取消关注');
      } else {
        appStore.showDialog(res.error);
      }
    });
  }

  cancelCollectArticle(article) {
    userStore.cancelCollectArticle(article).then(res => {
      if (res.status) {
        appStore.showDialog('已取消收藏');
      } else {
        appStore.showDialog(res.error);
      }
    });
  }

  renderItem(type, item) {
    return type ? (
      <AppView item={item} onPress={() => this.cancelFollowApp(item)} />
    ) : (
      <ArticleView
        item={item}
        titleOnPress={url => this.openLink(url)}
        onPress={() => this.cancelCollectArticle(item)}
      />
    );
  }

  render() {
    const { collectArticles, followApps } = userStore;
    const { type } = this.props;
    const data = type ? followApps : collectArticles;
    return (
      <View>
        <FlatList
          data={data}
          renderItem={({ item }) => this.renderItem(type, item)}
        />
      </View>
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
    fontSize: 20,
    margin: 10
  },
  TextStyle: {
    marginLeft: 10,
    lineHeight: 30
  },
  CategoryTitle: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 18
  }
});

export default CardList;
