// Shared Prettier configuration for all Pyrrha projects
// Based on proven Pyrrha-Dashboard configuration
module.exports = {
  // Core formatting rules (from Dashboard .prettierrc)
  singleQuote: true,
  bracketSameLine: true, // Updated from deprecated jsxBracketSameLine

  // Additional standardization
  semi: true,
  trailingComma: 'es5',
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,

  // Language-specific overrides
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 120,
      },
    },
    {
      files: '*.md',
      options: {
        printWidth: 100,
        proseWrap: 'always',
      },
    },
    {
      files: '*.scss',
      options: {
        singleQuote: false,
      },
    },
    {
      files: '*.{js,jsx}',
      options: {
        singleQuote: true,
        bracketSameLine: true, // Updated from deprecated jsxBracketSameLine
      },
    },
  ],
};
