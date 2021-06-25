const menus = {
  home: {
    name: 'Home',
    path: '/home',
    component: 'Home'
  },
  inviteList: {
    name: '参会人员',
    path: '/inviteList',
    icon: 'sketch',
    component: 'InviteList'
  },
  action: {
    name: 'ActionTest',
    path: '/action',
    icon: 'api',
    component: 'ActionTest'
  },
  file: {
    name: 'File',
    path: '/file',
    icon: 'api',
    component: 'FileList'
  },
  rule: {
    name: 'class实现',
    path: '/rule',
    icon: 'tool',
    component: 'Rule'
  },
  ruleHook: {
    name: 'hook实现',
    path: '/ruleHook',
    icon: 'sketch',
    component: 'RuleHook'
  },
};

export default menus;

// 拆解权限，获取菜单；
export function generateMenu(data) {
  if (data.indexOf('menu:') !== 0) {
    return { home: menus.home };
  }

  const _menus = data.slice(5).split(',');

  if (_menus[0] === 'all') {
    return menus;
  }

  return _menus.reduce((pre, cur) => {
    if (menus[cur]) {
      pre[cur] = menus[cur];
    }
    return pre;
  }, { home: menus.home });
}
