module.exports = (config) => {
  config.externals = {
    react : 'react',
    moment: 'moment',
    // carno: 'carno',
    'react-dom': 'reactDom',
    'antd-doddle': 'antdDoddle',
    'react-router-dom': 'reactRouterDom', 
    antd: 'antd',
  };
  return config;
}
