/*
 * @Author: wuyiqing 
 * @Date: 2018-03-09 17:34:38 
 * @Last Modified by: wuyiqing
 * @Last Modified time: 2018-03-10 13:42:15
 * 文章列表
 */

import React, { Component } from 'react';
import { ScrollView, FlatList, View, StyleSheet } from 'react-native';
import { List, Text, ListItem, Card } from 'react-native-elements';

import Colors from '../styles/Colors';
import { formatTime } from '../utils';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formatTime
    };
  }

  renderItem(item) {
    return (
      <View style={Styles.ListItem}>
        <Card
          title={item.title}
          image={{ uri: item.image }}
          titleStyle={Styles.titleStyle}
          imageStyle={{ alignSelf: 'flex-start' }}
        >
          <Text style={Styles.TextStyle}>{item.summary.slice(0, 64)}</Text>
          <Text>{formatTime(item.time)}</Text>
        </Card>
      </View>
    );
  }

  render() {
    const { data } = this.props;
    return (
      <ScrollView contentContainerStyle={Styles.ScrollView}>
        <List style={Styles.List}>
          <FlatList
            data={data}
            renderItem={({ item }) => this.renderItem(item)}
          />
        </List>
      </ScrollView>
    );
  }
}

const Styles = StyleSheet.create({
  ListItem: {
    margin: 5
  },
  titleStyle: {
    textAlign: 'left',
    marginLeft: 10,
    marginRight: 10
  },
  TextStyle: {
    marginBottom: 10,
    fontSize: 16,
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

export default SearchResult;
