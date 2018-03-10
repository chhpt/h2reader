/*
 * @Author: wuyiqing 
 * @Date: 2018-03-08 14:01:30 
 * @Last Modified by: wuyiqing
 * @Last Modified time: 2018-03-10 20:46:23
 * 存储用户信息
 */

import API from '../api';
import { observable, action } from 'mobx';
import { passwordEncrypt } from '../utils';
import { saveData } from '../utils/storage';

class UserStore {
  @observable account = {};
  @observable followApps = [];
  @observable collectArticles = [];

  async sendCode(email) {
    const res = await API.sendVerificationCode(email);
    return res;
  }

  @action
  async register(account) {
    const { username, email, password, code } = account;
    const res = await API.register(email, username, password, code);
    // 注册成功
    if (res.status) {
      const { account } = res;
      this.accoutn = account;
      saveData(account, account); 
    }
    return res;
  }

  @action
  async login(account) {
    const { email, password } = account;
    const res = await API.login(email, passwordEncrypt(password).toString());
    // 登录成功
    if (res.status) {
      const { account } = res;
      this.accoutn = account;
      saveData(account, account);
    }
    return res;
  }

  async logout() {}
}

export default new UserStore();
