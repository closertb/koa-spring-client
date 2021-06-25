import React, { useEffect, useState, useCallback } from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom'; // HashRouter as Router,
import { Layout, Menu } from 'antd';
import cookie from 'js-cookie';
import HeaderMap from '../components/HeaderMap';
import { SITE_NAME, unCompileParam, app } from '../configs/constants';
import { generateMenu } from '../configs/menu';
import Pages from '../pages';
import styles from './index.less';

const { Sider, Content } = Layout;

export default function Layer() {
  const { hash } = window.location;

  const hashArr = hash.split('/');
  const [userInfo, setUserInfo] = useState({});
  const [collapsed, setCollapsed] = useState(false);
  // const [permission, setPermission] = useState(true);
  const { dispatch } = app._store;
  useEffect(() => {
    const token = cookie.get('token');
    const uid = cookie.get('uid');
    const name = cookie.get('username');
    if (!(uid && token)) {
      dispatch({ type: 'login/logout' });
      return;
    }

    const menus = generateMenu(unCompileParam(cookie.get('auth') || ''));
    setUserInfo({
      name,
      menus,
      ready: true,
      pathKeys: Object.keys(menus),
    });
  }, []);

  // useEffect(() => {
  //   const { pathKeys = [] } = userInfo;

  //   const permissionMenu = pathKeys.find(path => hash.indexOf(`/${path}`) > 0);

  //   setPermission(!!permissionMenu);
  // }, [hash, userInfo]);

  const logout = useCallback(() => {
    dispatch({ type: 'login/logout' });
  }, []);

  const selectedHash = hashArr.length > 1 ? hashArr[1] : 'home';

  const { menus = {}, name = '未登录' } = userInfo;

  // 由于menu获取是异步的，如果不加这句，会导致路由被重定向到首页
  if (!userInfo.ready) {
    return null;
  }

  return (
    <Layout className={styles.Layout}>
      <Sider
        className="layout-side"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="logo">{SITE_NAME}</div>
        <Menu theme="dark" mode="inline" selectedKeys={[selectedHash]}>
          {Object.keys(menus).map(key => (
            <Menu.Item key={key}>
              <Link to={menus[key].path}>
                <span>{menus[key].name}</span>
              </Link>
            </Menu.Item>))
          }
        </Menu>
      </Sider>
      <Layout className="layout-content">
        <HeaderMap
          onToggle={() => { setCollapsed(!collapsed); }}
          collapsed={collapsed}
          onLogout={logout}
          username={name}
        />
        <Content style={{ margin: '24px 16px 0', padding: 24, background: '#fff', minHeight: 'auto' }}>
          <Switch>
            {Object.values(menus).map(({ path, component }) => (
              <Route exact key={path} path={path} component={Pages[component]} />
            ))}
            <Redirect to="/home" />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}
