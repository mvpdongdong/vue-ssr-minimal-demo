import axios from 'axios';
import qs from 'querystring';
import cookieBus from './cookieBus';

const baseURL = 'https://api.mimei.net.cn';
const isServer = process.env.VUE_ENV === 'server';

// 创建axios实例
const service = axios.create({
  baseURL: baseURL, // api的base_url
  timeout: 15000, // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  (config) => config,
  (error) => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  (response) =>
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    response.data

  ,
  (error) => {
    console.log('err' + error); // for debug
    return Promise.reject(error);
  }
);

export default service;

export function axiosPost (opts) {
  const data = opts.data ? qs.stringify(opts.data) : {};
  const config = {
    url: opts.url,
    method: 'post',
    data: data
  };
  if (isServer) {
    config.headers = config.headers || {};
    config.headers.cookie = cookieBus.$cookie;
  }
  return service(config);
}

export function axiosGet (opts) {
  const params = opts.params || {};
  const config = {
    url: opts.url,
    method: 'get',
    params
  };
  if (isServer) {
    config.headers = config.headers || {};
    config.headers.cookie = cookieBus.$cookie;
  }
  return service(config);
}
