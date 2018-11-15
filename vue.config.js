module.exports = {
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
    loaderOptions: {
      sass: {
        data: `@import "@/styles.scss";`,
        // data: `@import "@/styles.scss"; @import "bulma/bulma.sass";`,
      },
    },
  },
};
