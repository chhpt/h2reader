/*
 * @Author: wuyiqing 
 * @Date: 2018-03-08 14:00:53 
 * @Last Modified by: wuyiqing
 * @Last Modified time: 2018-03-11 22:05:52
 * 
 */

import { observable, computed, action } from 'mobx';
import API from '../api';
import { saveData } from '../utils/storage';
import userStore from './UserStore';

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

  @computed
  get appList() {
    return this.categoryApps.map(e => {
      const app = userStore.followApps.slice(0).find(v => v.title === e.title);
      e.followed = Boolean(app) && !app.delete;
      return e;
    });
  }

  @computed
  get searchAppList() {
    return this.searchResult.map(e => {
      const app = userStore.followApps.slice(0).find(v => v.title === e.title);
      e.followed = Boolean(app) && !app.delete;
      return e;
    });
  }

  @action
  setCategories(categories) {
    this.categories = categories;
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
  loadCategoryApps(title, filter) {
    this.categoryTitle = title;
    const apps = this.categories.slice(0).find(e => e.title === title).sections;
    if (filter) {
      apps.forEach(e => {
        const app = userStore.followApps
          .slice(0)
          .find(v => v.title === e.title);
        e.followed = Boolean(app) && !app.delete;
      });
    }
    this.categoryApps = apps;
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
      saveData('categories', res);
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new CategoryStore();
