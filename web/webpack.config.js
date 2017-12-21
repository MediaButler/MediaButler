/* eslint-disable strict */
'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
process.env.NODE_ENV = 'dev';
module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    path.join(__dirname, 'src', 'init', 'main.js'),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-[hash].js',
    chunkFilename: '[id]-[hash].chunk.js',
    publicPath: process.env.BASE_URL, // needs to be root
  },
  resolve: {
    extensions: [ '', '.js' ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'src', 'init', 'index.html'),
      NODE_ENV: 'production',
      APP_NAME: 'MediaButler',
    }),
    new webpack.DefinePlugin({
      APP_VERSION: JSON.stringify('0.4'),
      'process.env': {
        APP_NAME: JSON.stringify('MediaButler'),
        NODE_ENV: JSON.stringify('production'),
        BASE_URL: JSON.stringify(process.env.BASE_URL),
      },
    }),
    new ExtractTextPlugin('[name]-[hash].css', {
      allChunks: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    //new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      compressor: {
        warnings: false,
      },
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [ /node_modules/, /__tests__/ ],
        loader: 'babel-loader',
      },
      { test: /\.json$/, exclude: [ /node_modules/, /__tests__/ ], loader: 'json' },
      { test: /\.(png|gif|jpg)$/, loader: 'url?limit=8192' },
      { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000&minetype=application/font-woff2' },
      { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000&minetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap') },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap!postcssr') },
    ],
  },
};
