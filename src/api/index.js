import { axiosGet } from '../utils/request';

export function fetchItem (id) {
  return axiosGet({
    url: '/api/v1/article/' + id
  });
}
export function fetchList () {
  return axiosGet({
    url: '/api/v1/article/'
  });
}
