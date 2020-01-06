// clara says
//     __          __    __             
//    / /_  ____  / /___/ /  __  ______ 
//   / __ \/ __ \/ / __  /  / / / / __ \
//  / / / / /_/ / / /_/ /  / /_/ / /_/ /
// /_/ /_/\____/_/\__,_/   \__,_/ .___/ 
//                             /_/      
// don't worry about this 
// But if you want to know more, go check out webpack.md

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path'),
      html = require('html-webpack-plugin'),
      webpack = require('webpack'),
      commons = 'commons';

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    index: './src/index.js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new html({
      filename: 'index.html',
      template: './src/template.html',
      inject: true,
      chunks: [commons, 'index']
    })
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    ]
  }
};