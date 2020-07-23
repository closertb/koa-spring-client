import React from 'react';
import { Router, Switch, Route } from 'dva/router';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale-provider/zh_CN';
import Layout from './Layout';
import pages from './pages';
import { Paths } from './configs/constants';


export default function ({ history }) {
  return (
    <ConfigProvider locale={zhCN}>
      <Router history={history}>
        <Switch>
          <Route path={Paths.LOGIN} component={pages.Login} />
          <Route path="/" component={Layout} />
        </Switch>
      </Router>
    </ConfigProvider>
  );
}
