module.exports = () => ({
  proxy: {
    '/api': {
      target: 'http://localhost:3000', // 'http://deploy.closertb.site',
      pathRewrite: { '^/api': '' },
      changeOrigin: true,
      secure: false
    },
  }
});
