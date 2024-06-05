import path from 'path'
import { fileURLToPath } from 'url'
// import { fixupPluginRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'

import standard from 'eslint-config-standard'
// import imports from 'eslint-plugin-import'
import vue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import prettier from 'eslint-config-prettier'
import globals from 'globals'
// import vueTs from '@vue/eslint-config-typescript'
import tseslint from 'typescript-eslint'

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

export default tseslint.config(
  ...compat.config(standard),
  // ...fixupPluginRules(compat.plugins('import')),
  // ...compat.config(importLint.configs.errors),
  // ...compat.config(importLint.configs.warnings),
  ...vue.configs['flat/recommended'],
  prettier,
  // ...compat.config(vueTs),
  // Adapted from @vue/eslint-config-typescript
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,

        extraFileExtensions: ['.vue'],
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  {
    files: ['*.ts', '*.cts', '*.mts', '*.tsx', '*.vue'],
    rules: {
      // The core 'no-unused-vars' rules (in the eslint:recommeded ruleset)
      // does not work with type definitions
      'no-unused-vars': 'off',
      // TS already checks for that, and Typescript-Eslint recommends to disable it
      // https://typescript-eslint.io/linting/troubleshooting#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
      'no-undef': 'off',
      '@typescript-eslint/no-unused-vars': 'off', // Seems buggy currently?
    },
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        Modernizr: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off', // Seems buggy currently?
      'vue/valid-v-for': 'off', // Seems buggy currently?
      // 'import/order': 'error',
      // 'import/first': 'error',
      // 'import/no-mutable-exports': 'error',
      // 'import/no-unresolved': 'off',
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
    },
  },
  {
    ignores: ['dist', 'generated', 'node_modules', 'src/modernizr-custom.js'],
  },
)
