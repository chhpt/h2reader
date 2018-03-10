/*
 * @Author: wuyiqing 
 * @Date: 2018-03-07 22:44:02 
 * @Last Modified by: wuyiqing
 * @Last Modified time: 2018-03-09 17:08:58
 * 单个应用的信息
 */

import { observable, action } from 'mobx';

export default class AppModel {
  @observable follewed = false;

  constructor() {

  }
  changeFollowStatus() {
    
  }
}
