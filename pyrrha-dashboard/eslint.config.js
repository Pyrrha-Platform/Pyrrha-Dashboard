// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jest from "eslint-plugin-jest";
import testingLibrary from "eslint-plugin-testing-library";
import jestDom from "eslint-plugin-jest-dom";

export default [
  js.configs.recommended,
  prettier,

  {
    ignores: ["**/node_modules/**", "**/build/**", "**/dist/**", "**/coverage/**"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module"
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-console": "off",
      "prefer-const": "error",
      eqeqeq: "error",
      "no-var": "error"
    }
  },

  {
    files: ["api-auth/**/*.js", "server.js"],
    languageOptions: {
      globals: { ...globals.node }
    }
  },

  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks
    },
    languageOptions: {
      globals: { ...globals.browser },
      parserOptions: { ecmaFeatures: { jsx: true } }
    },
    settings: {
      react: { version: "detect" }
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off"
    }
  },

  {
    files: [
      "**/__tests__/**/*.{js,jsx,ts,tsx}",
      "**/*.{test,spec}.{js,jsx,ts,tsx}"
    ],
    plugins: {
      jest,
      "testing-library": testingLibrary,
      "jest-dom": jestDom
    },
    languageOptions: {
      globals: { ...globals.jest, ...globals.browser }
    },
    rules: {
      ...jest.configs.recommended.rules,
      ...testingLibrary.configs["react"].rules,
      ...jestDom.configs.recommended.rules
    }
  }
];