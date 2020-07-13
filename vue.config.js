const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: 'https://resource.itaotuo.com/website/activity/twokeys',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  configureWebpack: {
    name: 'two keys',
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
  },
};
