const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  // 开发服务器配置
  devServer: {
    host: '0.0.0.0', // 新增：监听所有网络接口
    port: 8080,      // 可选：指定端口（默认8080）
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/download': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})