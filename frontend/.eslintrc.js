module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: [
    'plugin:@angular-eslint/recommended',
  ],
  rules: {
    '@angular-eslint/directive-selector': [
      'error',
      { type: 'attribute', prefix: 'bg', style: 'camelCase' },
    ],
    '@angular-eslint/component-selector': [
      'error',
      { type: 'element', prefix: 'bg', style: 'kebab-case' },
    ],
  },
  overrides: [
    {
      files: ['*.component.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      plugins: ['@angular-eslint/template'],
      processor: '@angular-eslint/template/extract-inline-html',
    },
    {
      files: ['*.ts'],
      extends: [
        'airbnb-typescript/base',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      rules: {
        '@typescript-eslint/lines-between-class-members': 'off',
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'class-methods-use-this': 'off',
        'max-classes-per-file': 'off',
        '@typescript-eslint/unbound-method': [
          'error',
          {
            ignoreStatic: true,
          },
        ],
        'import/no-extraneous-dependencies': ["error", {"devDependencies": true}],
        'array-callback-return': ['error'],
        'complexity': ['error'],
        'consistent-return': ['error'],
        'curly': ['error'],
        'default-case': ['error'],
        'eqeqeq': ['error']
      },
    },
    {
      files: ['*.spec.ts'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
    {
      files: ['e2e/**/*.e2e-spec.ts', 'e2e/**/*.po.ts'],
      parserOptions: {
        project: './e2e/tsconfig.json',
      },
      extends: ['plugin:protractor/recommended'],
      plugins: ['protractor'],
      rules: {
        "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
      }
    },
  ],
};