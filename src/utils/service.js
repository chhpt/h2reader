import axios from 'axios';

// 创建实例
const service = axios.create({
  baseURL: 'http://lite-api.whutdev.com',
  withCredentials: true,
  timeout: 10000
});

// 添加一个请求拦截器
service.interceptors.request.use(config => config, error => Promise.reject(error));

// 添加一个返回拦截器
service.interceptors.response.use(response => response.data, (error) => {
  // 错误，重定向到错误页面
  if (error.response) {
    if (error.response.status) {
      return Promise.reject(new Error(error.response.status));
    }
  } else if (error.message.indexOf('timeout') > -1) {
    // 请求超时
    return Promise.reject('请求超时，请重试');
  }
  return Promise.reject(error.response);
});

export default service;
