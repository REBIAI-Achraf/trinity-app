const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    allowedHosts: [
      'mytrinitywebapp-front-dev.azurewebsites.net',
      'mytrinitywebapp-front-prod.azurewebsites.net',
      'localhost',
      '0.0.0.0',
    ],
  },
})
