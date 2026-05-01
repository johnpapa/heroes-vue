module.exports = {
  root: true,

  env: {
    node: true,
  },

  plugins: ['prettier'],

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'consistent-return': 0,
    quotes: [2, 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    'max-classes-per-file': 'off',
    'no-useless-constructor': 'off',
    'no-empty-function': 'off',
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
    'vue/multi-word-component-names': 'off',
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
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
  ],
};
