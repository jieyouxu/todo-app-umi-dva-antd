import {Menu, Icon} from 'antd';
import Link from 'umi/link';

import styles from './Header.css';

const DVA_ADDRESS = 'https://github.com/dvajs/dva';
const UMI_ADDRESS = 'https://umijs.org/';

function Header({location}) {
  return (
    <div className={styles['header-container']}>
      <Menu
        defaultSelectedKeys={[location.pathname]}
        mode="horizontal"
      >
        <div className={styles.header}>
          <h1
            className={styles['title-text']}
          >
            {'Todo List '}&mdash;{' Built with '}
            <a href={DVA_ADDRESS} className={styles.header__link}>DVA</a>
            {' and '}
            <a href={UMI_ADDRESS} className={styles.header__link}>UMI</a>
          </h1>
        </div>
        <Menu.Item key="/">
          <Link to="/">
            <Icon type="home"/>
            <span>Home</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/todos">
          <Link to="/todos">
            <Icon type="bars"/>
            <span>Todo List</span>
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default Header;
