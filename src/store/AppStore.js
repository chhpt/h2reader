/*
 * @Author: wuyiqing 
 * @Date: 2018-03-08 14:00:53 
 * @Last Modified by: wuyiqing
 * @Last Modified time: 2018-03-09 18:00:22
 * 存储应用层信息
 */

import { observable, computed, action } from 'mobx';
import API from '../api';

class AppStore {
  @observable articleList = [];
  @observable followedApps = [];
  @observable currentApp = {};

  @action
  setCurrentApp(app) {
    this.currentApp = app;
  }

  @action
  async fetchArticleList() {
    const { type, appId, remoteid } = this.currentApp;
    appType = type ? Number(type) : 0;
    const res = await API.getArticleList(
      appType,
      appId,
      type ? 'home' : remoteid
    );
    this.articleList = res.articleList;
    return res;
  }
}

export default new AppStore();
