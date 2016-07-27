'use strict'
var path = require('path')

var entryPath = './src/js/index.js';
var jsPath = path.join(__dirname, 'src', 'js');

module.exports = {
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js', '.scss']
  },
  entry: entryPath,
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'main.js'
  },
  module: {
    preLoaders: [
      {
        test: jsPath,
        loader: 'eslint'
      }
    ],
    loaders:[
      {
        test: jsPath,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  }
}
