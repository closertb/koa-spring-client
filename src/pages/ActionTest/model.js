import cookie from 'js-cookie';
import { login, upload, updateCache, clearCache } from './services';

export default ({
  namespace: 'index',
  state: {
    count: 0,
    user: {},
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
    * updateCache({ payload }, { call }) {
      yield call(updateCache, payload);
    },
    * clearCache({ payload }, { call }) {
      yield call(clearCache, payload);
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
        dispatch({ type: 'add' });
      });
    }
  },
  reducers: {
    updateCount(state, { payload }) {
      return {
        ...state,
        count: payload.count
      };
    }
  }
});
