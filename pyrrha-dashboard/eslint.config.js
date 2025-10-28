// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jest from 'eslint-plugin-jest';
import testingLibrary from 'eslint-plugin-testing-library';
import jestDom from 'eslint-plugin-jest-dom';

export default [
  js.configs.recommended,
  prettier,

  {
    ignores: [
      '**/node_modules/**',
      '**/build/**',
      '**/dist/**',
      '**/coverage/**',
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off',
      'prefer-const': 'warn',
      eqeqeq: 'warn',
      'no-var': 'warn',
      'no-undef': 'off', // Disable for mixed Node.js/browser environments
    },
  },

  {
    files: [
      'api-auth/**/*.js',
      'server.js',
      'src/setupProxy.js',
      'src/serviceWorker.js',
    ],
    languageOptions: {
      globals: {
        ...globals.node,
        module: 'readonly',
        require: 'readonly',
        process: 'readonly',
      },
      sourceType: 'script', // CJS files
    },
  },

  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    languageOptions: {
      globals: { ...globals.browser, process: 'readonly' },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'warn', // Downgrade to warning
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-key': 'warn',
    },
  },

  {
    files: [
      '**/__tests__/**/*.{js,jsx,ts,tsx}',
      '**/*.{test,spec}.{js,jsx,ts,tsx}',
    ],
    plugins: {
      jest,
      'testing-library': testingLibrary,
      'jest-dom': jestDom,
    },
    languageOptions: {
      globals: { ...globals.jest, ...globals.browser },
    },
    rules: {
      ...jest.configs.recommended.rules,
      ...testingLibrary.configs['react'].rules,
      ...jestDom.configs.recommended.rules,
    },
  },
];
