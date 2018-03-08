/*
 * @Author: wuyiqing 
 * @Date: 2018-03-08 14:00:53 
 * @Last Modified by: wuyiqing
 * @Last Modified time: 2018-03-08 23:59:57
 * 
 */

import { observable, computed, action } from 'mobx';
import API from '../api';

class CategoryStore {
  @observable categories = [];
  @observable searchResult = [];
  @observable categoryApps = [];
  @observable categoryTitle = '';

  // 所有应用
  @computed
  get apps() {
    let apps = [];
    this.categories.slice(0).forEach(e => {
      apps = apps.concat(e.sections.slice(0));
    });
    return apps;
  }

  @computed
  get category() {
    return this.categories.slice(0);
  }

  // 获取应用名称
  @action
  findApp(name) {
    if (this.categories.slice(0).length) {
      const apps = this.apps.slice(0).filter(e => e.title.indexOf(name) > -1);
      this.searchResult = apps.length ? apps : [{ title: '无结果' }];
    } else {
      this.searchResult = [{ title: '无结果' }];
    }
  }

  @action
  loadCategoryApps(title) {
    this.categoryTitle = title;
    this.categoryApps = this.categories
      .slice(0)
      .find(e => e.title === title).sections;
  }

  @action
  clearSearchResult() {
    this.searchResult = [];
  }

  // 从服务器获取应用分类
  async fetchCategories() {
    try {
      const res = await API.getCategories();
      this.categories = res;
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new CategoryStore();
