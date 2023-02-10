const babel = require("@rollup/plugin-babel");
const nodeResolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const terser = require("@rollup/plugin-terser");
const path = require("path");
const pkg = require("./package.json");
const resolve = (...args) => path.resolve(...args); // 适应不同环境，封装path.resolve，少写一点代码
const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";

const extensions = [".js", ".ts"];

module.exports = {
  input: resolve("src/main.ts"),
  output: [
    { file: resolve(pkg.main), format: "cjs" },
    { file: resolve(pkg.module), format: "es" },
  ],
  plugins: [
    isProd
      ? terser({
          maxWorkers: 4,
        })
      : false,
    nodeResolve({
      extensions,
    }),
    commonjs(),
    babel({
      extensions,
      babelHelpers: "bundled",
      include: ["src/**/*"],
      exclude: "node_modules/**",
    }),
  ].filter(Boolean),
};
