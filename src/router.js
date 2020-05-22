import React from 'react';
import { Router, Switch, Route } from 'dva/router';
import { ConfigProvider } from 'antd';
import { LocaleProvider } from 'antd';
import Layout from './Layout';
import pages from './pages';
import { Paths } from './configs/constants';

const { zhCN } = LocaleProvider;

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
