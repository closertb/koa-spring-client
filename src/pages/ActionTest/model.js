import cookie from 'js-cookie';
import { login, upload, readCacheCount, updateCache, clearCache } from './services';

export default ({
  namespace: 'index',
  pattern: 'Blog-*',
  state: {
    count: 0,
    pattern: 'Blog-*',
    user: {},
    cacheCount: 0,
    loading: {
      login: false
    }
  },
  effects: {
    * add(_, { select, update }) {
      const { count } = yield select('index');
      yield update({ count: count + 1 });
    },
    * subtract(_, { select, update }) {
      const { count } = yield select('index');
      yield update({ count: count - 1 });
    },
    * upload({ payload }, { call }) {
      yield call(upload, payload);
    },
    * updateCache({ payload }, { select, call, put }) {
      const { pattern } = yield select('index');
      yield call(updateCache, { pattern });
      yield put({ type: 'readCacheCount', payload: { pattern } });
    },
    * clearCache({ payload }, { select, call, put }) {
      const { pattern } = yield select('index');
      yield call(clearCache, { pattern });
      yield put({ type: 'readCacheCount', payload: { pattern } });
    },
    * readCacheCount({ payload: { pattern } = { pattern: 'Blog-*' } }, { call, update }) {
      const { total } = yield call(readCacheCount, { pattern });
      yield update({ cacheCount: total, pattern });
    },
    * login({ payload }, { call, update }) {
      const user = yield call(login, payload);
      const { id, token, name } = user;
      const expires = { expires: 1 };
      cookie.set('uid', id, expires);
      cookie.set('username', name, expires);
      cookie.set('token', token, expires);
      cookie.remove('lastPath');
      yield update({ user });
    }
  },
  subscriptions: {
    setup({ dispatch, listen }) {
      listen('/action', () => {
        dispatch({ type: 'readCacheCount' });
      });
    }
  },
  reducers: {
    updateCount(state, { payload }) {
      return {
        ...state,
        count: payload.count
      };
    },
  }
});
