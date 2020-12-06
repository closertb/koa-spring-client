const fs = require('fs');

module.exports = () => {
  return {
    host: 'local.closertb.site',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    proxy: {
      // context: () => true,
      // target: 'http://local.closertb.site:8906',
      '/api': {
        target: 'http://local.closertb.site:3000',
        pathRewrite: {'^/api' : ''}
      }
      /* bypass: function(req, res, proxyOptions) {
        if (/\.(js|css|html|json|jpg|png)$/.test(req.url)) {
          console.log('Skipping proxy for browser request.', req.headers.accept);
          return req.url.replace('httP:localhost:8906', '');
        }
        return;
      } */
    }
  }
}