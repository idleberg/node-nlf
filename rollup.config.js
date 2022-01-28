import typescript from '@rollup/plugin-typescript';

export default {
  external: [
    'json5'
  ],
  input: 'src/index.ts',
  output: {
    file: 'dist/index.mjs',
    format: 'esm',
    sourcemap: true
  },
  plugins: [
    typescript()
  ]
};
