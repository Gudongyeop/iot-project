module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api' : {
        target: 'http://i3a206.p.ssafy.io:3000/',
        changeOrigin: true,
        logLevel: 'debug',
        secure: false,
      }    
    }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}