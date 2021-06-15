module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    "react-native/react-native": true
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    }
  },
  env: {
  },
  parser: "babel-eslint",
  plugins: [
    'react',
    'react-native',
    'react-hooks'
  ],
  settings: {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".ios.js", ".android.js"]
      }
    }
  },
  rules: {
    "react-native/no-unused-styles": 2,
    "react-native/no-inline-styles": 2,
    "react-native/no-color-literals": 2,
    "react-native/no-raw-text": 2,
    "react-native/no-single-element-style-arrays": 2,
    "no-multi-spaces": 0,
    "import/no-dynamic-require": 0,
    "quotes": 0,
    "no-console": 0,
    "no-use-before-define": 0,
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "import/no-extraneous-dependencies": ["error", {"packageDir": './'}],
    "padding-line-between-statements": [2, {blankLine: "always", prev: ['const', 'let', 'var'], next: '*'}, {blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"]}],
    "no-multiple-empty-lines": [2, {"max": 1}],
    "react/destructuring-assignment": 0,
    "no-bitwise": 0,
    "no-plusplus": 0,
    "jsx-a11y/accessible-emoji": 0,
    "react-hooks/rules-of-hooks": "error",
    "eqeqeq": [1, "smart"],
    // "react-hooks/exhaustive-deps": "warn"
  },
  globals: {
    "__DEV__": true,
    "fetch": true,
    "XMLHttpRequest": true,
    "FormData": true
  }
};
