import neostandard from 'neostandard'

import prettier from 'eslint-config-prettier'
import globals from 'globals'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'

export default defineConfigWithVueTs(
  ...neostandard({
    files: ['*.vue'],
    ignores: ['dist', 'generated', 'node_modules', 'src/modernizr-custom.js'],
    noJsx: true,
    ts: false, //Handled by defineConfigWithVueTs
    noStyle: true,
    globals: {
      ...globals.browser,
      Modernizr: 'readonly',
    },
  }),
  prettier,
  vueTsConfigs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
    },
    rules: {
      'vue/require-default-prop': 'off',
      'vue/no-parsing-error': [
        'error',
        {
          'x-invalid-end-tag': false,
        },
      ],
    },
  },
)
