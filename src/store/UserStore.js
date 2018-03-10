/*
 * @Author: wuyiqing 
 * @Date: 2018-03-08 14:01:30 
 * @Last Modified by: wuyiqing
 * @Last Modified time: 2018-03-09 21:03:18
 * 存储用户信息
 */


class UserStore {
  constructor() {
    this.username = '';
    this.email = '';
    this.followApps = [];
    this.collection = [];
  }

  register(username, email, password, code) {

  }

  login(email, password) {

  }

  logout() {
    
  }
}

export default new UserStore();