import request from '@/plugins/request';
export function articlePut (data) {
  return request({
    url: '/api/article',
    method: 'put',
    data
  });
}

export function articleListGet (data) {
  return request({
    url: '/api/articleList?' + data.params,
    method: 'get',
    data
  });
}

export function articleGet (data) {
  return request({
    url: '/api/article/' + data.id,
    method: 'get',
    data
  });
}
export function articlePost (data) {
  return request({
    url: '/api/article',
    method: 'post',
    data
  });
}

export function articleDelete (data) {
  return request({
    url: '/api/article/' + data.id,
    method: 'delete',
    data
  });
}


export function sortTypePost (data) {
  return request({
    url: '/api/sortType',
    method: 'post',
    data
  });
}

export function articleAllList () {
  return request({
    url: '/articleList',
    method: 'get',
  });
}
export function articleDiscuss (data) {
  return request({
    url: '/api/articleDiscuss/' + data.articleId,
    method: 'get',
  });
}
