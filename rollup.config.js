const babel = require('@rollup/plugin-babel');
const nodeResolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const terser = require('@rollup/plugin-terser');
const path = require('path');
const pkg = require('./package.json');
const dts = require('rollup-plugin-dts');
const { merge } = require('lodash');
const resolve = (...args) => path.resolve(...args); // 适应不同环境，封装path.resolve，少写一点代码
const isDev = process.env.NODE_ENV === 'dev';
const isProd = process.env.NODE_ENV === 'prod';
const esmenv = 'esm';
const devOutput = './example/index.esm.js';

const input = resolve('src/index.ts');
const extensions = ['.js', '.ts'];
const jobs = {
  [esmenv]: {
    output: {
      format: 'esm',
      file: isDev ? resolve(devOutput) : resolve(pkg.module),
    },
  },
  umd: {
    output: {
      format: 'umd',
      file: resolve(pkg.main),
      name: 'px2rem2js',
    },
  },
  min: {
    output: {
      format: 'umd',
      file: resolve(pkg.main.replace(/(.\w+)$/, '.min$1')),
      name: 'px2rem2js',
    },
  },
};

const mergeConfig = jobs[process.env.FORMAT || esmenv];

module.exports = [
  merge(
    {
      input,
      output: {},
      plugins: [
        // isProd
        //   ? terser({
        //       maxWorkers: 4,
        //     })
        //   : false,
        nodeResolve({
          extensions,
        }),
        commonjs(),
        babel({
          extensions,
          babelHelpers: 'bundled',
          include: ['src/**/*'],
          exclude: 'node_modules/**',
        }),
      ].filter(Boolean),
    },
    mergeConfig,
  ),
  isProd && process.env.FORMAT === esmenv
    ? {
        input,
        plugins: [dts.default()],
        output: {
          file: pkg.types,
          format: 'es',
        },
      }
    : false,
].filter(Boolean);
