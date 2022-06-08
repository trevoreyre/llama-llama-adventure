module.exports = {
  siteName: 'Llama Llama Adventure',
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'posts/**/*.md',
        typeName: 'Post',
        remark: {},
      },
    },
  ],
  transformers: {
    remark: {},
  },
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
