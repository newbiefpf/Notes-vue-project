// const Setting = require('./src/setting.env');
module.exports = {
  publicPath: "/",
  devServer: {
    proxy: {
      '/serve': {
        target: 'http://localhost:8888', //服务端地址
        changeOrigin: true, // 允许跨域
        ws: true, //如果要代理 websockets，配置这个参数
        // client: {
        //   webSocketURL: 'ws://localhost:8888/ws',
        // },
        // headers: {
        //   'Access-Control-Allow-Origin': '*',
        // },
        // secure: false, // 如果是https接口，需要配置这个参数
        pathRewrite: {
          '^/serve': ''   // 标识替换，使用 '/api' 代替真实的接口地址
        }
      }
    }
  }

};
