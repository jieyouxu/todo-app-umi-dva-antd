import React from 'react';
import styles from './page.css';
import {Layout} from 'antd';
import globalStyles from '../../global.css';
import TodoList from './components/TodoList';

export default () => {
  return (
    <TodoList/>
  );
}
