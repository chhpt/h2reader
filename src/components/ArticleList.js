/*
 * @Author: wuyiqing 
 * @Date: 2018-03-09 17:34:38 
 * @Last Modified by: wuyiqing
 * @Last Modified time: 2018-03-12 21:02:39
 * 文章列表
 */

import React, { Component } from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import { Card } from 'react-native-elements';

import Colors from '../styles/Colors';
import { formatTime } from '../utils';

class SearchResult extends Component {
  constructor(props) {
    super(props);
  }

  renderItem(item) {
    return (
      <View style={Styles.ListItem}>
        <Card
          image={item.image ? { uri: item.image } : null}
          containerStyle={Styles.cardStyle}
        >
          <Text
            style={Styles.titleStyle}
            onPress={() => this.props.cardOnPress(item)}
          >
            {item.title}
          </Text>
          <Text style={Styles.TextStyle}>{item.summary.slice(0, 64)}</Text>
          <Text>{formatTime(item.time)}</Text>
        </Card>
      </View>
    );
  }

  render() {
    const { data } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        {data.length ? (
          <FlatList
            data={data}
            onEndReached={() => this.props.onEndReached()}
            onEndReachedThreshold={1}
            renderItem={({ item }) => this.renderItem(item)}
          />
        ) : null}
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
    borderRadius: 2
  },
  titleStyle: {
    color: Colors.title,
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 36
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
