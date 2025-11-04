// Shared ESLint configuration for all Pyrrha JavaScript/React projects
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
      '**/venv/**',
      '**/.git/**',
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      // Core JavaScript rules
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off', // Allow console for server-side logging
      'prefer-const': 'error',
      eqeqeq: 'error',
      'no-var': 'error',
      'no-duplicate-imports': 'error',
      'no-unreachable': 'error',
    },
  },

  // CommonJS files (require/module.exports)
  {
    files: ['**/*.cjs', '**/check-workspace.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: { ...globals.node },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off',
      'prefer-const': 'error',
    },
  },

  // Node.js server files (API backends, MQTT client, WebSocket server)
  {
    files: [
      '**/server.js',
      '**/api.py', // Flask entry points
      '**/mqttclient.js',
      '**/logger.js',
      'api-auth/**/*.js',
      'api-main/**/*.py',
    ],
    languageOptions: {
      globals: { ...globals.node },
    },
    rules: {
      'no-process-exit': 'warn',
    },
  },

  // React frontend files
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    languageOptions: {
      globals: { ...globals.browser },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'warn',
    },
  },

  // Test files
  {
    files: [
      '**/__tests__/**/*.{js,jsx,ts,tsx}',
      '**/*.{test,spec}.{js,jsx,ts,tsx}',
      '**/test/**/*.js',
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
