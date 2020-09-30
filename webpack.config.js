const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

module.exports = (config) => {
  // config.entry = './md5.js';
  // config.output.library =  'md5';
  // config.output.libraryTarget = 'umd';
  // config.output.filename = 'md5.js';
  // 配置按需加载，单独打包，加速加载时间
  config.optimization.splitChunks.chunks = 'initial';
  config.plugins.push(new AntdDayjsWebpackPlugin());
  return config;
}