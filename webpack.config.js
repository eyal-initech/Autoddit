const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')


module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.(css|\.scss)$/, use: ExtractTextWebpackPlugin.extract(
          {fallback: 'style-loader', use: [{loader: 'css-loader', options: { minimize: true, sourceMap: true}}, 'sass-loader']}
        )
      },
      { test: /\.(ttf|eot|woff|woff2)$/, use: {loader: "file-loader", options: {name: "fonts/[name].[ext]" }}},
      { test: /\.(jpg|png|svg)$/, use:{ loader: "file-loader", options: { name: "assets/[name].[hash].[ext]" }}}
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new ExtractTextWebpackPlugin({
      filename: "bundle.css",
      disable: false,
      allChunks: true
    }),
    new UglifyJsPlugin({
      sourceMap: true,

    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.template.html'),
      inject: 'body',
    }),
  ]
}
