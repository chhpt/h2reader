/*
 * @Author: wuyiqing 
 * @Date: 2018-03-08 14:00:53 
 * @Last Modified by: wuyiqing
 * @Last Modified time: 2018-03-11 20:43:13
 * 存储应用层信息
 */

import { observable, computed, action } from 'mobx';
import API from '../api';

class AppStore {
  @observable articleList = [];
  @observable currentApp = {};
  @observable dialogVisible = false;
  @observable dialogText = '';

  @action
  setCurrentApp(app) {
    this.currentApp = app;
  }

  @action
  showDialog(text) {
    this.dialogText = text;    
    this.dialogVisible = true;
  }

  @action
  hideDialog(){
    this.dialogText = '';    
    this.dialogVisible = false;
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
