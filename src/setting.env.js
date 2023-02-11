/**
 * iView Admin Pro 开发配置
 * */

const env = process.env.NODE_ENV;

const Setting = {
  isMock: true,
  publicPath: env === 'development' ? '/' : '/',
  outputDir: 'dist',
  assetsDir: '',
};

module.exports = Setting;
