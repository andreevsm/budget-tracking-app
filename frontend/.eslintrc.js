module.exports = {
  extends: ['plugin:@angular-eslint/recommended'],
  rules: {
    '@angular-eslint/directive-selector': [
      'error',
      { type: 'attribute', prefix: 'app', style: 'camelCase' },
    ],
    '@angular-eslint/component-selector': [
      'error',
      { type: 'element', prefix: 'app', style: 'kebab-case' },
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
			files: ['src/**/*.spec.ts', 'src/**/*.d.ts'],
			parserOptions: {
				project: './src/tsconfig.spec.json',
			},
			extends: ['plugin:jasmine/recommended'],
			plugins: ['jasmine'],
			env: { jasmine: true },
			rules: {
				'@typescript-eslint/no-unused-vars': 'off',
			},
		},
		{
      files: ['*.ts'],
      extends: [
        'airbnb-typescript/base',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
			},
			rules: {
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'class-methods-use-this': 'off',
        'lines-between-class-members': 'off',
        '@typescript-eslint/unbound-method': [
          'error',
          {
            ignoreStatic: true,
          },
        ],
      },
		},
		{
      files: ['*.ts'],
      extends: [
				'airbnb-typescript/base',
				'prettier/@typescript-eslint',
				'plugin:prettier/recommended',
      ],
    },
  ],
};
