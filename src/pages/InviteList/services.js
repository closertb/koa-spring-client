import { createRequest } from 'antd-doddle/hooks';
import http from '../../configs/http';

const request = http.create('admin');

const { useRequest, useLazyRequest } = createRequest(request);

export {
  useRequest,
  useLazyRequest
};
