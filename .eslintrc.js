module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: [
    "airbnb-base",
    "prettier",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module",
  },
  ignorePatterns: [
    ".eslintrc.js",
    "webpack.config.js",
    "babel.config.js",
    "dist/**/*",
    "coverage/**/*",
  ],
  rules: {
    "import/no-unresolved": "off",
    "import/extensions": ["warn", "never"],
    "import/prefer-default-export": "off",
    "lines-between-class-members": [
      "error",
      "always",
      { exceptAfterSingleLine: true },
    ],
    "max-classes-per-file": "off",
    "class-methods-use-this": ["error", { exceptMethods: ["render"] }],
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: ["**/*.test.ts", "**/*.test.js"] },
    ],
    "@typescript-eslint/ban-ts-comment": [
      "error",
      { "ts-ignore": "allow-with-description" },
    ],
    "no-underscore-dangle": "off",
    "no-param-reassign": ["error", { props: false }],
    "max-len": [
      "error",
      {
        code: 100,
        ignoreComments: true,
      },
    ],
  },
  plugins: ["jest", "@typescript-eslint"],
};
