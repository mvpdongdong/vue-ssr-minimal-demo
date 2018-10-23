import { axiosGet } from '../utils/request';

export function fetchItem (config) {
  return axiosGet({
    url: '/api/v1/article/' + config.params.id,
    cookie: config.headers.cookie
  });
}
export function fetchList (config) {
  return axiosGet({
    url: '/api/v1/article/',
    cookie: config.headers.cookie
  });
}
