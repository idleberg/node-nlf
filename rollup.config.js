import typescript from '@rollup/plugin-typescript';

export default {
  external: [
    'json5'
  ],
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'cjs'
  },
  plugins: [
    typescript()
  ]
};
