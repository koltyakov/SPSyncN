const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './tmp/SPSyncN.js',
  target: 'node',
  output: {
    path: path.join(__dirname, '..', 'SPSyncN/Resources'),
    filename: 'SPSyncN.js',
    library: 'SPSyncN',
    libraryTarget: 'var'
  },
  module: {
    rules: [{
      test: /rx\.lite\.aggregates\.js/,
      use: 'imports-loader?define=>false'
    }]
  },
  plugins: [
    new UglifyJSPlugin({
      parallel: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
    // new BundleAnalyzerPlugin()
  ]
};
