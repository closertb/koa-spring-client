/* eslint-disable react/button-has-type */
import React from 'react';
import { Input, Button } from 'antd';
import { model } from 'antd-doddle/decorator';
import style from './index.less';
import Edit from './edit';

@model('index')
export default class Index extends React.PureComponent {
  state = { pattern: 'Blog-*' }

  login = () => {
    const { _login } = this.props;
    _login({ name: 'dom', pwd: 'dom456' });
  }

  clearCache = () => {
    const { pattern } = this.state;
    const { _clearCache } = this.props;
    _clearCache({ pattern });
  }

  handleChange = (e = {}) => {
    e.target && e.target.value && this.setState({ pattern: e.target.value });
  }

  render() {
    const { error, loading, _add, _subtract, _upload, _updateCache, _refreshCache, count, user } = this.props;
    if (error) {
      return <div>{error.msg}</div>;
    }
    return (
      <div className={style.Action}>
        <div className="block">
          <h3>操作测试</h3>
          <div>
            <div>
              <Button onClick={_add}>加1</Button>
              <Button onClick={_subtract}>减1</Button>
            </div>
            <div>
              <span>计数:{count}</span>
            </div>
          </div>
        </div>
        <div className="block">
          <h3>请求测试</h3>
          <div>
            <div>
              <Button onClick={this.login}>login</Button>
            </div>
            <div>
              {loading.login ? <span>请求中</span> : <span>{user.name ? user.name : '未登录'}</span>}
            </div>
          </div>
        </div>
        <div className="block">
          <h3>操作缓存</h3>
          <div>
            <div>
              <Input onChange={this.handleChange} />
              <div>
                <Button onClick={this.clearCache}>清除缓存</Button>
                <Button onClick={_updateCache} type="primary">更新缓存</Button>
              </div>
              <div>
                <Button onClick={_refreshCache} type="primary">刷新列表</Button>
              </div>
            </div>
            <div>
              {loading.updateCache ? <span>请求中</span> : <span>空闲</span>}
            </div>
          </div>
        </div>
        <div className="block">
          <Edit handle={_upload} />
        </div>
      </div>
    );
  }
}
