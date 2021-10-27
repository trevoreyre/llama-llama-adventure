module.exports = {
  siteName: 'Llama Llama Adventure',
  plugins: [],
  css: {
    loaderOptions: {
      css: {
        camelCase: true,
      },
    },
  },
  templates: {
    Post: '/posts/:title',
  },
  port: 3005,
  host: '0.0.0.0',
}
