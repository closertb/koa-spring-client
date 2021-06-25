import dva from 'dva';

export const SITE_NAME = '公共后台';

export const APP_CLIENT_ID = 336;

export const PAGE_SIZE = 5;

export const GENERATE_ARRAY = [1, 2, 3];

const FixOffeset = GENERATE_ARRAY.reduce((pre, next) => (pre + next * next), 0) + GENERATE_ARRAY.length;

export function compileParam(code) {
  let c = String.fromCharCode(code.charCodeAt(0) + FixOffeset + code.length);
  for (let i = 1; i < code.length; i += 1) {
    c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
  }
  return c; // 增加特殊字符编码，防止'/', '&', '='等字符造成的影响
}

// 解密
export function unCompileParam(code = '') {
  let c = String.fromCharCode(code.charCodeAt(0) - FixOffeset - code.length);
  for (let i = 1; i < code.length; i += 1) {
    c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
  }
  return c;
}

// 页面路径
export const Paths = {
  LOGIN: '/login',
  HOME: '/home',
  ACTION: '/action',
  RULE: '/rule',
  RULE_HOOK: '/ruleHook',
};

export const app = dva({
  onError(e) {
    console.log(e);
  }
});
