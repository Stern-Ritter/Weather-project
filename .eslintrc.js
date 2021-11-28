module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module",
  },
  rules: {
    "import/prefer-default-export": "off",
    "no-underscore-dangle": "off",
    "max-len": [
      "error",
      {
        code: 100,
        ignoreComments: true,
      },
    ],
    "no-use-before-define": [
      "error",
      {
        functions: false,
      },
    ],
  },
  plugins: ["jest"],
};
