import request from '@/plugins/request';
export function messagesGet (data) {
  return request({
    url: '/api/messages',
    method: 'get',
    data
  });
}

export function messagePost (data) {
  return request({
    url: '/api/message/' + data.id,
    method: 'post',
    data
  });
}

export function messageDelete (data) {
  return request({
    url: '/api/message/' + data.id,
    method: 'delete',
    data
  });
}




























