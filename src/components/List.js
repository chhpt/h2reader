/*
 * @Author: wuyiqing 
 * @Date: 2018-03-11 12:56:56 
 * @Last Modified by: wuyiqing
 * @Last Modified time: 2018-03-13 14:20:21
 * 分类和搜索结果列表
 */

import React, { Component } from 'react';
import { ScrollView, FlatList, View, StyleSheet, Text } from 'react-native';
import { Icon, Card, Avatar, Button } from 'react-native-elements';

import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import Colors from '../styles/Colors';

const FollowButton = ({ followed, onPress }) => {
  return followed ? (
    <Icon name="check" size={30} type="Entypo" onPress={onPress} />
  ) : (
    <Icon name="add" size={30} onPress={onPress} />
  );
};

class SearchResult extends Component {
  constructor(props) {
    super(props);
  }

  // 渲染列表条目
  renderItem(item) {
    return (
      <View style={Styles.ListItem}>
        {/* 应用图片 */}
        <Avatar
          medium
          rounded
          source={{ uri: item.imageURL }}
          onPress={
            this.props.titleOnPress ? () => this.props.titleOnPress(item) : null
          }
        />
        {/* 标题 */}
        <Text
          style={Styles.ItemText}
          onPress={
            this.props.titleOnPress ? () => this.props.titleOnPress(item) : null
          }
        >
          {item.title}
        </Text>
        {this.props.detailIcon ? (
          <Icon
            name="chevron-right"
            size={30}
            onPress={() => this.props.listOnPress(item.title)}
          />
        ) : null}
        {this.props.followIcon && (
          <FollowButton
            followed={item.followed}
            onPress={() => this.props.followIconOnPress(item)}
          />
        )}
      </View>
    );
  }

  render() {
    const { data, title } = this.props;
    return (
      <ScrollView contentContainerStyle={Styles.ScrollView}>
        {title && (
          <Card containerStyle={Styles.CardTitle}>
            <Text style={{ fontSize: 18 }}>{title}</Text>
          </Card>
        )}
        <View>
          <FlatList
            data={data}
            renderItem={({ item }) => this.renderItem(item)}
          />
        </View>
      </ScrollView>
    );
  }
}

const Styles = StyleSheet.create({
  ScrollView: {
    backgroundColor: '#fff',
    paddingBottom: 60
  },
  ListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: Colors.border
  },
  ItemText: {
    marginLeft: 20,
    fontSize: 18,
    flex: 1
  },
  CardTitle: {
    margin: 0,
    borderWidth: 0,
    elevation: 4,
    padding: 20
  }
});

export default SearchResult;
