/*
 * @Author: wuyiqing 
 * @Date: 2018-03-08 14:01:30 
 * @Last Modified by: wuyiqing
 * @Last Modified time: 2018-03-11 19:47:38
 * 存储用户信息
 */

import API from '../api';
import { observable, action, computed } from 'mobx';
import { passwordEncrypt } from '../utils';
import { saveData, removeData } from '../utils/storage';

const {
  sendVerificationCode,
  register,
  login,
  logout,
  getCollectArticles,
  getFollowAPPs,
  followAPP,
  cancelFollowAPP
} = API;

class UserStore {
  @observable account = {};
  @observable followApps = [{ title: '没有数据' }];
  @observable collectArticles = [{ title: '没有数据' }];
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
      this.collectArticles = res.articles;
    }
    return res;
  }

  @action
  async fetchFollowApps() {
    const res = await getFollowAPPs();
    if (res.status) {
      this.followApps = res.apps;
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
}

export default new UserStore();
