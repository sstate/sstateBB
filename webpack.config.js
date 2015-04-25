
var webpack = require('webpack');

var plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
];

if (process.env.PRODUCTION) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  );
}

module.exports = {

  entry: './public/js/index',

  resolve: {
    packageAlias: "browser"
  },

  output: {
    path: './public/dist/',
    filename: '_bundle.js'
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['react-hot', 'babel'] },
    ]
  },

  node: {
    Buffer: false
  },

  plugins: plugins

};