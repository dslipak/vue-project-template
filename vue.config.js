const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  configureWebpack: {
    devtool: false,
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },
    plugins: [
      new CompressionPlugin(),
      new webpack.SourceMapDevToolPlugin({})
    ]
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:9090',
        ws: false,
        changeOrigin: true
      },
      '^/ws': {
        target: 'ws://localhost:9090',
        ws: true,
        changeOrigin: true
      }
    },
    headers: { "Access-Control-Allow-Origin": "localhost" }
  }
}