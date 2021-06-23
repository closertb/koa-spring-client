module.exports = () => ({
  proxy: {
    '/api': {
      target: 'http://deploy.closertb.site',
      pathRewrite: { '^/api': '' },
      changeOrigin: true,
      secure: false
    },
  }
});
