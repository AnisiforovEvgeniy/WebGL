// vite.config.js
export default {
  root: 'src',
  base: './',
  publicDir: '../public',
  server: {
    port: 3000,
    open: true, 
  },
  build: {
    outDir: '../dist', // куда собирать продакшен
    assetsDir: './assets',
  },
};