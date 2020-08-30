const webpack =  require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',         //показывает имя scss для свойства 
  devServer: {
    contentBase: baseWebpackConfig.externals.paths.dist,
    port: 4200,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  //webpack.SourceMapDevToolPlugin - карта сайта
  plugins: [
    // new CleanWebpackPlugin(),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    })
  ]
})

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig)
})
