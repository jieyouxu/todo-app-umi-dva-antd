import request from '../../../utils/request';
import {DEFAULT_ITEMS_PER_PAGE} from '../../../constants';

export function fetch({page = 1}) {
  return request(`/api/todos?_page=${page}&_limit=${DEFAULT_ITEMS_PER_PAGE}`);
}

export function remove(id) {
  return request(`/api/todos/${id}`, {
    method: 'DELETE',
  });
}

export function patch(id, values) {
  return request(`/api/todos/${id}`, {
    'Content-Type': 'application/json',
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values),
  });
}
