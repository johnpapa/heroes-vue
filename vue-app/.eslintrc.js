module.exports = {
  root: true,

  env: {
    node: true,
  },

  plugins: ['prettier'],

  // watch this for explaining why some of this is here
  // https://www.youtube.com/watch?time_continue=239&v=YIvjKId9m2c
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'consistent-return': 0,
    quotes: [2, 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    'max-classes-per-file': 'off',
    'no-useless-constructor': 'off',
    'no-empty-function': 'off',
    'import/prefer-default-export': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/no-unused-vars': ['error'],
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 80,
      },
    ],
    'vue/no-unused-components': [
      'error',
      {
        ignoreWhenBindingPresent: true,
      },
    ],
  },

  parserOptions: {
    parser: '@typescript-eslint/parser',
  },

  extends: [
    '@vue/airbnb',
    'plugin:vue/vue3-essential',
    '@vue/prettier',
    '@vue/typescript',
  ],
};
