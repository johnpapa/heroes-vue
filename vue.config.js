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
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        data: `@import "@/styles.scss";`,
        // data: `@import "@/styles.scss"; @import "bulma/bulma.sass";`,
      },
    },
  },
};
