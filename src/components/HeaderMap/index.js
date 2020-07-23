import React from 'react';
import { Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import HeaderBtns from './HeaderBtns';
import styles from './index.less';

const { Header } = Layout;

function HeaderMap({ collapsed, username, onToggle, onLogout }) {
  return (
    <Header className={styles.header}>
      <HeaderBtns username={username} onLogout={onLogout} />
      {collapsed ? <MenuFoldOutlined onClick={onToggle} /> : <MenuUnfoldOutlined onClick={onToggle} />}
    </Header>
  );
}

export default React.memo(HeaderMap);
