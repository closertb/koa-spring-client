const fs = require('fs');

module.exports = () => {
  return {
    proxy: {
      context: () => true,
      target: 'https://loanopt.56qq.com',
      changeOrigin: true,
      secure: false,
      bypass: function(req, res, proxyOptions) {
        if (/\.(js|css|html|json|jpg|png)$/.test(req.url)) {
          console.log('Skipping proxy for browser request.', req.headers.accept);
          return req.url.replace('httP:localhost:8906', '');
        }
        return;
      }
    }
  }
}