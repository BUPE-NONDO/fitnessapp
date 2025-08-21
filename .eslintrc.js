/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:perfectionist/recommended-natural"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [
    "@typescript-eslint",
    "react",
    "react-hooks",
    "perfectionist"
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/no-explicit-any": "warn",
    "perfectionist/sort-imports": [
      "error",
      {
        "type": "natural",
        "order": "asc"
      }
    ],
    "perfectionist/sort-named-imports": [
      "error",
      {
        "type": "natural",
        "order": "asc"
      }
    ]
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  env: {
    browser: true,
    es2022: true,
    node: true
  }
};
