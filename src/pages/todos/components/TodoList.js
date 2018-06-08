import React from 'react';
import {
  Table,
  Button,
  Pagination,
  Layout,
  Divider,
  Tooltip,
  Card,
  Switch,
  Icon,
} from 'antd';
import {connect} from 'dva';
import {DEFAULT_ITEMS_PER_PAGE} from '../../../constants';
import {routerRedux} from 'dva/router';
import TodoEditModal from './TodoEditModal';
import TodoStatusToggle from './TodoStatusToggle';
import styles from './TodoList.css';

function TodoList({dispatch, todoList: dataSource, loading, total, page: currentPage}) {
  function handleDelete(id) {
    dispatch({
      type: 'todos/remove',
      payload: id,
    });
  }

  function handleEdit(id, values) {
    dispatch({
      type: 'todos/patch',
      payload: {id, values},
    });
  }

  function handlePageChange(page) {
    dispatch(routerRedux.push({
      pathname: '/todos',
      query: {page},
    }));
  }

  function handleCreate(values) {
    dispatch({
      type: 'todos/create',
      payload: values,
    });
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (id) => (id),
    },
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
      render: (userId) => (<a href="">{userId}</a>),
    },
    {
      title: 'Task',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Status',
      dataIndex: 'completed',
      key: 'completed',
      render: (completed) => (
        completed ? 'Completed' : 'To do'
      ),
    },
    {
      title: 'Operations',
      key: 'operations',
      render: (text, record) => (
        <span>
          <Tooltip
            placement="top"
            arrowPointAtCenter
            title="Edit"
          >
            <TodoEditModal
              record={record}
              onOk={handleEdit.bind(null, record.id)}
            >
              <Button
                shape="circle"
                icon="edit"
              />
            </TodoEditModal>
          </Tooltip>
          <Divider
            type="vertical"
          />
          <Tooltip
            placement="top"
            arrowPointAtCenter
            title="Delete"
          >
            <Button
              shape="circle"
              icon="delete"
              onClick={handleDelete.bind(null, record.id)}
            />
          </Tooltip>
          <Tooltip/>
        </span>
      ),
    },
  ];

  return (
    <Layout>
      <Card>
        <TodoEditModal
          record={{}}
          onOk={handleCreate}
        >
          <Button type="primary" icon="plus">Add Task</Button>
        </TodoEditModal>
        <Divider
          type="horizontal"
        />
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey={record => record.id}
          pagination={false}
          loading={loading}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          curent={currentPage}
          pageSize={DEFAULT_ITEMS_PER_PAGE}
          onChange={handlePageChange}
        />
      </Card>
    </Layout>
  );
}

function mapStateToProps(state) {
  const {todoList, total, page, completed} = state.todos;
  return {
    todoList,
    total,
    page,
    completed,
    loading: state.loading.models.todos,
  };
}

export default connect(mapStateToProps)(TodoList);
