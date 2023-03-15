import request from '@/plugins/request';
export function login (data) {
  return request({
    url: '/login',
    method: 'post',
    data
  });
}

export function chicken () {
  return request({
    url: '/chicken',
    method: 'get',
  });
}

export function ping () {
  return request({
    url: '/api/ping',
    method: 'get',
  });
}























