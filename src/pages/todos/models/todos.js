import * as todosService from '../services/todos';

export default {
  namespace: 'todos',
  state: {
    todoList: [],
    total: null,
    page: null,
  },
  reducers: {
    save(state, {payload: {data: todoList, total, page}}) {
      return {...state, todoList, total, page};
    },
  },
  effects: {
    * fetch({payload: {page = 1}}, {call, put}) {
      const {data, headers} = yield call(todosService.fetch, {page});
      yield put(
        {
          type: 'save',
          payload: {
            data,
            total: parseInt(headers['x-total-count'], 10),
            page: parseInt(page, 10),
          },
        },
      );
    },
    * remove({payload: id}, {call, put, select}) {
      yield call(todosService.remove, id);
      const page = yield select(state => state.todos.page);
      yield put({type: 'fetch', payload: {page}});
    },
    * patch({payload: {id, values}}, {call, put, select}) {
      yield call(todosService.patch, id, values);
      const page = yield select(state => state.todos.page);
      yield put({type: 'fetch', payload: {page}});
    },
    * create({payload: {values}}, {call, put, select}) {
      yield call(todosService.create, values);
      const page = yield select(state => state.todos.page);
      yield put({type: 'fetch', payload: {page}});
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/todos') {
          dispatch({type: 'fetch', payload: query});
        }
      });
    },
  },
};
