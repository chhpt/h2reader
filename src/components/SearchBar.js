/*
 * Created by wuyiqing at 2018/3/7 下午5:24
 */

import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';
import { View } from 'react-native';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';

@inject('categoryStore')
class HeaderSearchBar extends Component {
  componentDidMount() {
    // 清空搜索结果
    this.props.categoryStore.clearSearchResult();
    this.search.focus();
  }

  handleSubmit(text) {
    this.props.categoryStore.findApp(text);
  }

  handleChange(text) {
    this.text = text;
  }

  render() {
    return (
      <View>
        <SearchBar
          lightTheme
          showLoading
          round
          ref={search => (this.search = search)}
          inputStyle={{ backgroundColor: '#fff', fontSize: 16 }}
          onSubmitEditing={e => this.handleSubmit(e.nativeEvent.text)}
          placeholder="Search"
        />
      </View>
    );
  }
}

export default HeaderSearchBar;
