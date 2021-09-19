import type { Options } from 'tsup'

export const tsup: Options = {
  sourcemap: false,
  dts: true,
  clean: true,
  minify: true,
  entryPoints: ['src/index.ts'],
  format: ['cjs', 'esm']
}
