import React from 'react';
import { Menu, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import styles from './index.less';

const MenuItem = Menu.Item;

function HeaderBtns({ username, onLogout }) {
  function getMenu() {
    return (
      <Menu>
        <MenuItem>
          <a onClick={onLogout}>
            退出登录
          </a>
        </MenuItem>
      </Menu>
    );
  }
  return (
    <div className={styles.controls}>
      <Dropdown overlay={getMenu()} className={styles.btns}>
        <a className="ant-dropdown-link">
          <UserOutlined />
          <span className={styles.username}>{username}</span>
        </a>
      </Dropdown>
    </div>
  );
}

export default React.memo(HeaderBtns);
