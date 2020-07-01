const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

module.exports = (config) => {
  // 配置按需加载，单独打包，加速加载时间
  config.optimization.splitChunks.chunks = 'initial';
  config.plugins.push(new AntdDayjsWebpackPlugin());
  return config;
}