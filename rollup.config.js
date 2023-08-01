import typescript from '@rollup/plugin-typescript';

export default {
  external: [
    'json5',
		'node:os'
  ],
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.mjs',
      format: 'esm',
      sourcemap: true
    },
    {
      file: 'dist/index.cjs',
      format: 'cjs',
      sourcemap: true
    }
  ],
  plugins: [
    typescript()
  ]
};
