// const babel = require("@rollup/plugin-babel");
const nodeResolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const terser = require('@rollup/plugin-terser')
const ts = require('@rollup/plugin-typescript')
const dts = require('rollup-plugin-dts')
const path = require('path')
const pkg = require('./package.json')
const resolve = (...args) => path.resolve(...args) // 适应不同环境，封装path.resolve，少写一点代码
const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

const extensions = ['.js', '.ts']

// function rmOnWrite(dir) {
//   return {
//     async writeBundle() {
//       (await import("node:fs/promises")).rm(dir, {
//         force: true,
//         recursive: true,
//       });
//     },
//   };
// }

module.exports = [
  {
    input: resolve('src/index.ts'),
    output: [
      // { file: resolve(pkg.main), format: "cjs" },
      { file: resolve(pkg.main), format: 'es' }
    ],
    plugins: [
      isProd
        ? terser({
          maxWorkers: 4
        })
        : false,
      nodeResolve({
        extensions
      }),
      commonjs(),
      // babel({
      //   extensions,
      //   babelHelpers: "bundled",
      //   include: ["src/**/*"],
      //   exclude: "node_modules/**",
      // }),
      ts({
        tsconfig: './tsconfig.json',
        compilerOptions: { declarationDir: './types' }
      })
    ].filter(Boolean)
  },
  {
    input: './dist/types/index.d.ts',
    output: { file: pkg.types, format: 'es' },
    plugins: [
      dts.default()
      // rmOnWrite("./dist/types")
    ]
  }
]
