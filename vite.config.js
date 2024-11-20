/**
 * @type {import('vite').UserConfig}
 */
module.exports = {
  server: {
    host: 'localhost',
    port: 6419
  },
  build: {
    minify: false,
    outDir: 'dist',
    lib: {
      entry: 'src/main.ts',
      name: 'script',
      fileName: 'script',
      formats: ['iife']
    }
  },
  resolve: {
    alias: {
      '@': '/src',
      '@create': '/src/create',
      '@utils': '/src/utils',
      '@enum': '/src/enum',
      '@const': '/src/const',
      '@style': '/src/style'
    }
  }
}
