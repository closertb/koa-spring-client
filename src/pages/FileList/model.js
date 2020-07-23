import { message } from 'antd';
import cookie from 'js-cookie';
import dayjs from 'dayjs';
import MyOss from './oss';
import * as services from './services';

export const oss = new MyOss();

const initialSearch = {
  pn: 1,
  ps: 10,
  time: [dayjs(), dayjs().endOf('day')],
  type: 'notes'
};


export default {
  namespace: 'file',

  state: {
    datas: [],
    total: 0,
    search: initialSearch,
    loading: { getList: false, infoInit: false },
  },

  subscriptions: {
    setup({ dispatch, listen }) {
      listen('/file', () => {
        dispatch({ type: 'createOss' });
      });
    }
  },
  effects: {
    * createOss({ payload }, { call, put }) {
      const ossKey = yield call(services.getUploadToken, {
        ossKey: cookie.get('ossKey')
      });
      yield oss.create(ossKey);
      yield put('getList');
    },
    * getList({ payload }, { select, call, update }) {
      const { search } = yield select('file');
      console.log('search', search);
      const result = yield call(oss.getList, search.type);
      if (!result) {
        message.error('获取失败');
        return;
      }
      const datas = result.objects.filter(({ name }) => name.indexOf(`/${search.type}/`));
      yield update({ datas: datas.reverse(), total: datas.length });
    },
  },

  reducers: {
    updateSearch(state, { payload }) {
      const { search } = state;
      return { ...state, search: { ...search, ...payload } };
    }
  }
};
