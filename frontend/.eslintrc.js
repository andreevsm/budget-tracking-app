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
        project: './tsconfig.eslint.json',
      },
      plugins: ['@angular-eslint/template'],
      processor: '@angular-eslint/template/extract-inline-html',
		},
		{
			files: ['src/**/*.spec.ts', 'src/**/*.d.ts'],
			parserOptions: {
				project: './src/tsconfig.spec.json',
        project: './tsconfig.eslint.json',
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
        project: './tsconfig.eslint.json',
			},
			rules: {
        'import/no-unresolved': 0,
        'import/prefer-default-export': 0,
        'class-methods-use-this': 0,
        'lines-between-class-members': 0,
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
