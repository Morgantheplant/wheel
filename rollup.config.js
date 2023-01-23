import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';

const isProduction = process.env.NODE_ENV === 'production'

const settings = {
    globals: {
      ms: 'ms'
    },
  }
  
export default {
  input: "src/index.js",
  output: {
    file: 'static/bundle.js',
    format: 'umd',
    name: "entrypoint",
    ...settings,
    plugins: [
        isProduction && terser()
      ]
  },
  plugins: [
    json(), 
    resolve({
      jsnext: true,
      main: true
    }),
    commonjs({
      include: 'node_modules/**',
      extensions: [ '.js' ],
      ignoreGlobal: false,
      sourceMap: false
    })
]
};