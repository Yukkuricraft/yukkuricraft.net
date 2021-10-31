module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    'standard',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:vue/recommended',
    'prettier/prettier',
    'plugin:prettier/recommended',
  ],
  plugins: ['vue', 'babel', 'prettier'],
  globals: {
    Modernizr: 'readonly',
  },
  rules: {
    'import/order': 'error',
    'import/first': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-unresolved': 'off',
    'arrow-parens': 'off',
    'generator-star-spacing': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false,
      },
    ],
    'no-lonely-if': 'error',
    curly: ['error', 'all'],
    'require-await': 'error',
    'dot-notation': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'no-useless-rename': 'error',

    'vue/require-default-prop': 'off',
    'vue/no-parsing-error': [
      'error',
      {
        'x-invalid-end-tag': false,
      },
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 5,
        multiline: 1,
      },
    ],
  },
}
