/*
 * @Author: wuyiqing 
 * @Date: 2018-03-08 14:00:53 
 * @Last Modified by: wuyiqing
 * @Last Modified time: 2018-03-12 18:39:06
 * 存储应用层信息
 */

import { observable, computed, action } from 'mobx';
import API from '../api';

const { getArticleList, getArticle } = API;

const sortArticleList = (articles) => articles.sort((a, b) => {
  if (Date.parse(a.time)) {
    return Date.parse(b.time) - Date.parse(a.time);
  } else if (parseInt(a.time, 10) < Date.now() / 1000) {
    return parseInt(b.time, 10) - parseInt(a.time, 10);
  }
  return [];
});

class AppStore {
  @observable articleList = [];
  @observable currentApp = {};
  @observable dialogVisible = false;
  @observable dialogText = '';
  @observable loading = false;
  @observable firstLoading = true;
  @observable article = {};

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
  hideDialog() {
    this.dialogText = '';
    this.dialogVisible = false;
  }

  @action
  async fetchArticleList() {
    this.firstLoading = true;
    this.articleList = [];
    const { type, appId, remoteid } = this.currentApp;
    appType = type ? Number(type) : 0;
    const res = await getArticleList(appType, appId, type ? 'home' : remoteid);
    this.articleList = sortArticleList(res.articleList);
    this.firstLoading = false;
    return res;
  }

  @action
  async fetchMoreArticles(id, page) {
    this.loading = true;
    const { type, appId, remoteid } = this.currentApp;
    appType = type ? Number(type) : 0;
    const res = await getArticleList(
      appType,
      appId,
      type ? 'home' : remoteid,
      id,
      page
    );
    if (res.status) {
      const { articleList } = res;
      const sortList = sortArticleList(articleList);
      this.articleList = this.articleList.slice(0).concat(sortList);
    }
    this.loading = false;    
    return res;
  }

  @action
  async fetchArticle(article) {
    this.article = {};
    this.loading = true;
    if (article.content) {
      this.article = article;
      this.loading = false;
      return article;
    }
    const type = this.currentApp.type ? Number(this.currentApp.type) : 0;
    const res = await getArticle(type, this.currentApp.appId, article);
    if (res.status) {
      this.article = res.article;
    }
    this.loading = false;
    return res;
  }
}

export default new AppStore();
