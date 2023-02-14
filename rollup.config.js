import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import jsx from "acorn-jsx";
import replace from "@rollup/plugin-replace";

const isProduction = process.env.NODE_ENV === "production";

export default {
  input: "src/index.tsx",
  output: {
    file: "static/bundle.js",
    format: "umd",
    name: "entrypoint",
    plugins: [isProduction && terser()],
  },
  acornInjectPlugins: [jsx()],
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      preventAssignment: true
    }),
    json(),
    resolve({
      jsnext: true,
      main: true,
    }),
    commonjs({
      include: "node_modules/**",
      extensions: [".js", ".ts" ,".tsx"],
      ignoreGlobal: false,
      sourceMap: true,
    }),
    typescript(),
  ],
};
