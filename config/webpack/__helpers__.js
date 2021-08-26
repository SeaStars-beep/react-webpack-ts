function getServer(openPage, PROXY_HOST, PORT) {
  const port = PORT || '9001';
  const devServer = {
    proxy: PROXY_HOST, // 后端地址
    host: '0.0.0.0',
    contentBase: './dist',
    hot: true,
    injectHot: true,
    open: true,
    openPage,
    port,
  };
  if (PROXY_HOST) {
    // proxy 服务
    devServer.proxy = {
      '/*': { target: PROXY_HOST },
    };
  } else {
    devServer.before = (app) => require('../../mock/api')(app);
  }
  return devServer;
}

module.exports = {
  getServer,
};
