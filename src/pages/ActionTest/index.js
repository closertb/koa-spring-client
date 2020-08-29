/* eslint-disable react/button-has-type */
import React from 'react';
import { Button, Select } from 'antd';
import { model } from 'antd-doddle/decorator';
import style from './index.less';
import Edit from './edit';

const { Option } = Select;

const keyMaps = [{
  value: 'Blog-*',
  label: '文章分页'
}, {
  value: 'BlogDetail-*',
  label: '文章详情'
}, {
  value: 'BlogAllList-key',
  label: '文章列表'
}];

@model('index')
export default class Index extends React.PureComponent {
  login = () => {
    const { _login } = this.props;
    _login({ name: 'dom', pwd: 'dom456' });
  }

  handleChange = (pattern) => {
    const { _readCacheCount } = this.props;
    pattern && _readCacheCount({ pattern });
  }

  render() {
    const { error, loading, cacheCount, _updateCache, _clearCache, pattern,
      _add, _subtract, _upload, count, user } = this.props;
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
              <Select
                tyle={{ width: '80%', marginTop: '10px' }}
                value={pattern}
                onChange={this.handleChange}
                allowClear
              >
                {keyMaps.map(({ label, value }) => <Option key={value} value={value}>{label}</Option>)}
              </Select>
              <div>
                <Button onClick={_clearCache}>清除缓存</Button>
                <Button onClick={_updateCache} type="primary">更新缓存</Button>
              </div>
            </div>
            <div>
              {loading.updateCache ? <span>请求中</span> : <span>{cacheCount}</span>}
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
