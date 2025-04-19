import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      unicorn: eslintPluginUnicorn,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'typeLike', // Applies to types, interfaces, enums, etc.
          format: ['PascalCase'], // Enforces CamelCase (PascalCase is used for types by convention).
        },
      ],
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            camelCase: false, // Disallow CamelCase (e.g., myComponent.tsx).
            pascalCase: true, // Allow PascalCase (e.g., MyComponent.tsx).
          },
          ignore: [
            '^(utils/)?index\\.tsx?$',
            '^.*\\.ts$', // Allow TypeScript files.
            '^main\\.tsx$', // Ignore main.tsx
          ]
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
        },
      ],
    },
  },
);
