// const Setting = require('./src/setting.env');
module.exports = {
  publicPath: "/",
  devServer: {
    proxy: {
      '/serve': {
        target: 'http://localhost:8888', //服务端地址
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          '^/serve': ''   // 标识替换，使用 '/api' 代替真实的接口地址
        }
      }
    }
  }

};
