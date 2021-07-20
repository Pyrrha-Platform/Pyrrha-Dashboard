const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api-main', { target: process.env.REACT_APP_MAIN_PROXY })
  );
  app.use(
    createProxyMiddleware('/api-auth', { target: process.env.REACT_APP_AUTH_PROXY })
  );
};
