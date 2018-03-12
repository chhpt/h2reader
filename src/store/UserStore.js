/*
 * @Author: wuyiqing 
 * @Date: 2018-03-08 14:01:30 
 * @Last Modified by: wuyiqing
 * @Last Modified time: 2018-03-12 15:38:37
 * 存储用户信息
 */

import API from '../api';
import { observable, action, computed } from 'mobx';
import { passwordEncrypt } from '../utils';
import { saveData, removeData } from '../utils/storage';

import appStore from './AppStore';

const {
  sendVerificationCode,
  register,
  login,
  logout,
  getCollectArticles,
  getFollowAPPs,
  followAPP,
  cancelFollowAPP,
  collectArticle,
  cancelCollectArticle
} = API;


class UserStore {
  @observable account = {};
  @observable followApps = [];
  @observable collectArticles = [];
  @observable cardListData = [];

  async sendCode(email) {
    const res = await sendVerificationCode(email);
    return res;
  }

  @action
  setAccount(account) {
    this.account = account;
  }

  @action
  setFollowApps(apps) {
    this.followApps = apps;
    saveData('followApps', apps);
  }

  @action
  setCollectArticles(articles) {
    this.collectArticles = articles;
    saveData('collectArticles', articles);
  }

  @action
  async register(account) {
    const { username, email, password, code } = account;
    const res = await register(email, username, password, code);
    // 注册成功
    if (res.status) {
      const { account } = res;
      this.accoutn = account;
      saveData('account', account);
    }
    return res;
  }

  @action
  async login(account) {
    const { email, password } = account;
    const res = await login(email, passwordEncrypt(password).toString());
    // 登录成功
    if (res.status) {
      const { account } = res;
      this.accoutn = account;
      saveData('account', account);
    }
    return res;
  }

  async logout() {
    const res = await logout();
    if (res.status) {
      this.account = {};
      removeData('account');
    }
    return res;
  }

  @action
  async fetchCollectArticles() {
    const res = await getCollectArticles();
    if (res.status) {
      this.setCollectArticles(res.articles);
    }
    return res;
  }

  @action
  async fetchFollowApps() {
    const res = await getFollowAPPs();
    if (res.status) {
      this.setFollowApps(res.apps);
    }
    return res;
  }

  @action
  async userFollowApp(app) {
    const res = await followAPP(app);
    if (res.status) {
      const { apps } = res;
      this.setFollowApps(apps);
    }
    return res;
  }

  @action
  async cancelUserFollowApp(app) {
    const res = await cancelFollowAPP(app);
    if (res.status) {
      const { apps } = res;
      this.setFollowApps(apps);
    }
    return res;
  }

  @action
  async collectArticle(article) {
    // 获取当前应用
    const app = appStore.currentApp;
    // 防止文章内容被删除
    const copyArticle = Object.assign({}, article);
    copyArticle.content = null;
    copyArticle.summary = copyArticle.summary.length < 128
      ? copyArticle.summary
      : copyArticle.summary.slice(0, 128);
    copyArticle.appName = app.title;
    const res = await collectArticle(copyArticle);
    if (res.status) {
      const articles = this.collectArticles.concat(copyArticle);
      this.setCollectArticles(articles);
    }
    return res;
  }

  @action
  async cancelCollectArticle(article) {
    const res = await cancelCollectArticle(article.url);
    if (res.status) {
      // 拷贝数组
      const source = this.collectArticles.slice(0);
      const index = source.findIndex((e) => e.title === article.title);
      source.splice(index, 1);
      // 更新收藏文章
      this.setCollectArticles(source);
    }
    return res;
  }
}

export default new UserStore();
