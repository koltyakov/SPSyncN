const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './tmp/SPSyncN.js',
  target: 'node',
  mode: 'production',
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};
