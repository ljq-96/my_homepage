module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'view': '@/view',
      }
    }
  },
  devServer: {
    port: 8000,
  },
  outputDir: '../dist/quaint',
  publicPath: '/'
}