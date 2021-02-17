const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api-main', { target: 'http://localhost:5000' })
  );
  app.use(
    createProxyMiddleware('/api-auth', { target: 'http://localhost:4000' })
  );
};
