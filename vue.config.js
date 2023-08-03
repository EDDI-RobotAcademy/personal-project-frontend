const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: [
    'vuetify'
  ],
  
  configureWebpack: {
    resolve: {
      fallback: {
        "timers": require.resolve("timers-browserify")
        
      }
    }
  },

  devServer: {
    proxy: {
      '/api': {
        target: 'http://openapi.molit.go.kr',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc',
        },
      },
    },
  },
});
