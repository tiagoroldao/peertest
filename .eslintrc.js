module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
    '@vue/typescript',
  ],
  rules: {
      'class-methods-use-this': 'off',
      'no-underscore-dangle': ['error', { allowAfterThis: true }],
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'import/prefer-default-export': false,
      'vue/singleline-html-element-content-newline': ['error', { ignoreWhenNoAttributes: false }],
      'no-param-reassign': ['error', { props: false }],
      'vue/html-closing-bracket-newline': ['error', {
          singleline: 'never',
          multiline: 'never',
      }],
      'max-len': ['error', { code: 120 }],
      'vue/html-indent': ['error', 4],
      indent: ['error', 4],
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
};
