module.exports = {
  configureWebpack: {
    devtool: 'source-map',
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:9627',
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
