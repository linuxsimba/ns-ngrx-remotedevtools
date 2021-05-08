module.exports = {
  parser: '@typescript-eslint/parser',
  rules: {
    'import/prefer-default-export': 'off',
    'array-bracket-spacing': [ 'error', 'always' ],
    'array-bracket-newline': [ 'error', { 'multiline': true } ],
    'indent': [ 'error', 2 ],
    'quotes': [ 'error', 'single' ],
    'max-len': [ 'error', { 'code': 140 } ], // import statements are long
    'comma-dangle': [ 'error', 'never' ],
    'key-spacing': [ 'error', { 'beforeColon': false, 'afterColon': true } ],
    'lines-between-class-members': [ 'error', 'always' ],
    'newline-after-var': [ 'error', 'never' ],
    'camelcase': [ 'error', { properties: 'always' } ],
    'semi': [ 'error', 'always' ],
    'no-console': 'error'
  },
  ignorePatterns: [
    'nativescript.config.ts', 'dist', 'karma.conf.js',
    'firebase.nativescript.json', 'webpack.config.js',
    'node_modules/', 'src/assets/', 'hooks/', 'platforms/',
    'App_Resources'
  ],
  overrides: [
    {
      files: [ '**/i18n/*.js' ],
      rules: {
        'camelcase': 'off',
        'quotes': 'off'
      }
    },
    {
      files: [ '*.json' ],
      rules: {
        'quotes': [ 'error', 'double' ],
        'indent': [ 'error', 2 ],
        'array-bracket-newline': 'off',
        'max-len': [ 'error', { 'code': 170 } ],
        'semi': [ 'error', 'never' ]
      }
    },
    {
      files: [ '*.ts' ],
      plugins: [
        '@typescript-eslint',
        'import',
        'ngrx'
      ],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
      ],
      parserOptions: {
        'project': 'tsconfig.json',
        'sourceType': 'module'
      },
      rules: {
        'ngrx/select-style': 'error',
        'max-len': [ 'error', { 'code': 120 } ], // import statements are long
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/consistent-type-assertions': [ 'error', { 'assertionStyle': 'angle-bracket' } ],
        'import/no-unresolved': 'error',
        'quotes': [ 'error', 'single' ],
        '@typescript-eslint/no-unused-expressions': [ 'error' ],
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/unbound-method': [ 'error', { 'ignoreStatic': true } ]
      },
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': [ '.ts' ]
        },
        'import/resolver': {
          'typescript': { 'alwaysTryTypes': true }
        }
      }
    }
  ]
};
