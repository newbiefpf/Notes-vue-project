const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  //开启代理服务器
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8888",
        pathRewrite: { "^/api": "" },
        changeOrigin: true,
      },
    },
  },
});
