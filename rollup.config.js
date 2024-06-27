// rollup.config.js

import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default [
  {
    input: 'main.js',  // Entry point for the first bundle
    output: {
      file: 'dist/bundle.js',
      format: 'umd',
      name: 'MyApp'
    },
    plugins: [
      nodeResolve(),
      commonjs()
      // Add other plugins as needed
    ]
  },
  {
    input: 'cad.js',  // Entry point for the second bundle
    output: {
      file: 'dist/bundleCad.js',
      format: 'umd',
      name: 'Bundle2'
    },
    plugins: [
      nodeResolve(),
      commonjs()
      // Add other plugins as needed
    ]
  }
];
