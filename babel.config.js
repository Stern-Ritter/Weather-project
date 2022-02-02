module.exports = (api) => ({
  plugins: ["@babel/plugin-transform-runtime"],
  presets: [
    [
      "@babel/preset-env",
      "@babel/preset-typescript",
      {
        useBuiltIns: "entry",
        corejs: 3,
        targets: api.caller((caller) => caller && caller.target === "node")
          ? { node: "current" }
          : { chrome: "58", ie: "11" },
      },
    ],
  ],
});
