const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    './demo/index',
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    alias: {
      'react': 'inferno-compat',
      'react-dom': 'inferno-compat',
    },
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: [
        path.join(__dirname, 'src'),
        path.join(__dirname, 'demo'),
      ],
    }, {
      test: /\.json$/,
      loaders: ['json'],
    }, {
      test: /\.css$/,
      include: [
        path.join(__dirname, 'src'),
        path.join(__dirname, 'demo'),
      ],
      loader: 'style!css!postcss',
    }],
  },
};
