/*
 * @Author: wuyiqing 
 * @Date: 2018-03-09 17:34:38 
 * @Last Modified by: wuyiqing
 * @Last Modified time: 2018-03-11 18:23:10
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
          containerStyle={Styles.cardStyle}
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
    margin: 5
  },
  cardStyle: {
    borderWidth: 0,
    elevation: 4,
    padding: 10,
    borderRadius: 2
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
  CategoryTitle: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 18
  }
});

export default SearchResult;
