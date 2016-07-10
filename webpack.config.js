const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new ExtractTextPlugin('example.css', { allChunks: true }),  // compiled css (single file only)
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules',
        include: /flexboxgrid/,
      },
      {
        test: /(\.scss|\.css)$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap'),
        exclude: /flexboxgrid/
      }
      // {
      //   test: /\.css$/,
      //   loaders: ['style', 'css'],
      //   exclude: /flexboxgrid/
      // },
      // {
      //   test: /\.less$/,
      //   loaders: ['style', 'css', 'less']
      // },
      // {
      //   test: /\.woff$/,
      //   loader: "url-loader?limit=10000&mimetype=application/font-woff&name=[path][name].[ext]"
      // },
      // {
      //   test: /\.woff2$/,
      //   loader: "url-loader?limit=10000&mimetype=application/font-woff2&name=[path][name].[ext]"
      // },
      // {
      //   test: /\.(eot|ttf|svg|gif|png)$/,
      //   loader: "file-loader"
      // }
    ]
  },
  postcss: [autoprefixer],
};
