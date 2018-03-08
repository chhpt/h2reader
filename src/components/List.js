import React, { Component } from 'react';
import { ScrollView, FlatList, View, StyleSheet } from 'react-native';
import {
  List,
  Text,
  ListItem,
  Avatar,
  Divider,
  Icon
} from 'react-native-elements';

import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import Colors from '../styles/Colors';

class SearchResult extends Component {
  renderItem(item) {
    return (
      <View style={Styles.ListItem}>
        <Avatar medium rounded source={{ uri: item.imageURL }} />
        <Text style={Styles.ItemText}>{item.title}</Text>
        {this.props.icon ? (
          <Icon
            name="chevron-right"
            size={30}
            onPress={() => this.props.listOnPress(item.title)}
          />
        ) : (
          <Text />
        )}
      </View>
    );
  }

  render() {
    const { data, title } = this.props;
    return (
      <ScrollView contentContainerStyle={Styles.ScrollView}>
        <Text style={title ? Styles.CategoryTitle : null}>{title}</Text>
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
