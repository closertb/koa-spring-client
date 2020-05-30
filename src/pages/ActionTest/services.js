import http from '../../configs/http';

const { post } = http.create('mock');

const { post: postAdmin } = http.create('admin');


export function login(param) {
  return post('/api/user/login', {
    ...param,
  }, { ignoreQuery: true });
}

export function upload(param) {
  return postAdmin('/operate/deploy', param, {
    type: 'formData',
    headerOption: {
    }
  });
}

export function updateCache() {
  return postAdmin('/arcticle/updateCache', {});
}

export function clearCache(param) {
  return postAdmin('/arcticle/clearCache', param);
}
