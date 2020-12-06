import Http from '@doddle/http';
import { Modal } from 'antd';
import cookie from 'js-cookie';
import getServer from './server';

let isModalShow = false;

function responseDataValidator({ _response = {} }, next) {
  // console.log('stat', _response);
  if (_response.status !== 'ok') {
    !isModalShow && Modal.error({
      title: '操作提示',
      content: _response.message || '请刷新页面或退出重新登录',
      onOk: () => {
        isModalShow = false;
      },
      onCancel: () => {
        isModalShow = false;
      }
    });
    isModalShow = true;
    return true;
  }
  return next();
}

export default Http.create({
  servers: getServer(),
  contentKey: 'content',
  bodyParam: {
    // credentials: 'include'
  },
  query() {
    const token = cookie.get('token');
    const uid = cookie.get('uid');
    return token ? { token, uid } : null;
  },
  beforeResponse: [responseDataValidator]

});

export function createApi(api, post) {
  const handler = {
    get: (target, key) => {
      const service = target[key];
      if (!service) {
        return {};
      }
      return typeof service === 'string' ? param => post(service, param) :
        param => post(service.api, param, service.extend);
    }
  };
  return new Proxy(api, handler);
}
