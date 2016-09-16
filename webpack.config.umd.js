/* globals __dirname */
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  externals: [
    'inferno',
    'inferno-compat'
  ],
  resolve: {
    alias: {
      'react': 'inferno-compat',
      'react-dom': 'inferno-compat'
    }
  },
  output: {
    library: 'ReactGameKit',
    libraryTarget: 'umd',
    filename: 'react-game-kit.min.js',
    path: path.join(__dirname, 'umd'),
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
    ],
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.SourceMapDevToolPlugin('[file].map'),
  ],
};
