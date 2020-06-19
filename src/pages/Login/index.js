import React, { createRef } from 'react';
import { connect } from 'dva';
import { Input, Button } from 'antd';
import { bind } from 'antd-doddle/decorator';
import FormGroup from '../../components/FormGroup';
import { fields } from './fields'
import './index.less';

const { FormRender } = FormGroup;
// 表单通用格式
export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const back = 'https://doddle.oss-cn-beijing.aliyuncs.com/images/back.jpg';

const initData = { pwd: '123456' };
@connect(({ login }) => ({ ...login }), dispatch => ({
  login(payload) {
    dispatch({ type: 'login/login', payload });
  }
}))

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = initData;
    this.formRef = createRef();
  }

  componentDidMount() {
    this.setState({ name: 'doddle' });
  }

  @bind
  handleLogin() {
    const { login } = this.props;
    const validate = this.formRef.current.validateFields;
    validate().then((values) => {
      console.log('values', values);
      login(values);
    });
/*       fetch('http://localhost:4001/user/login', {
        method: 'POST',
        body: 'name=dom&pwd=123456',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error('请求错误'));
      })
        .then(data => console.log('json:', data))
        .catch(error => console.error('error:', error)); */
  }

  render() {
    const { siteName, loading } = this.props;

    const { name } = this.state;

    console.log('name', name);
    return (
      <div
        className="h-login-frame-viewport"
        style={{
          backgroundImage: `url(${back})`,
          backgroundPosition: '50%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: '100%'
        }}
      >
        <div className="h-login-outer-logo">
          <div>
            <span>{siteName}</span>
            <span className="h-login-welcome">欢迎您</span>
          </div>
        </div>
        <div className="h-login-form">
          <h3 className="h-login-logo">系统登录</h3>
          <FormGroup {...formItemLayout} ref={this.formRef} datas={this.state}>
            {fields.map(field => <FormRender key={field.key} field={field} />)}
            {/* <FormRender
              name="name"
              label="账号"
              initialValue={name}
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input placeholder="Username" />
            </FormRender>
            <FormRender
              name="pwd"
              label="密码"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                type="password"
                placeholder="Password"
              />
            </FormRender> */}
            <div style={{ textAlign: 'center' }}>
              <Button loading={loading.login} style={{ width: '100%' }} type="primary" onClick={this.handleLogin}>
                登录
              </Button>
            </div>
          </FormGroup>
        </div>
      </div>
    );
  }
}

export default Login;
