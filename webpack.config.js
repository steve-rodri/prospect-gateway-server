const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: path.resolve(__dirname,'src/server.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [
          '/node_modules/',
          '/database/'
        ],
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [require('@babel/plugin-proposal-object-rest-spread')]
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  target: 'node', //http://community.openfl.org/t/target-node/9973
  externals: {
    knex: 'commonjs knex', //https://github.com/tgriesser/knex/issues/1128#issuecomment-312735118
    express: 'commonjs express'
  }
};