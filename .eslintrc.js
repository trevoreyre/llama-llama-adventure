const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'plugin:gridsome/recommended',
    'plugin:vue/essential',
    'plugin:prettier/recommended',
    '@vue/prettier',
  ],
  rules: {
    'no-console': isProduction ? 'error' : 'off',
    'no-debbugger': isProduction ? 'error' : 'off',
  },
}
