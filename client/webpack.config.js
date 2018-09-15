
const path = require('path')
const fs = require('fs')

let nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports.server = {
  target: 'node',
  entry: {
    server: './src/server/server.jsx'
  },
  output: {
    path: path.join(__dirname, 'dist/server'),
    filename: 'server.js'
  },
  externals: nodeModules,
  module: {
      loaders: [
          {
              loader: 'babel-loader?cacheDirectory=true',
              exclude: /node_modules/,
              test: /\.js[x]?$/,
          }
      ]
  }
};

module.exports.client = {
  target: 'web',
  entry: {
      bundle: './src/assets/client.jsx'
  },
  output: {
    path: path.join(__dirname, 'assets/javascript'),
    filename: 'bundle.js'
  },
  module: {
      loaders: [
          {
              loader: 'babel-loader?cacheDirectory=true',
              exclude: /node_modules/,
              test: /\.js[x]?$/,
          }
      ]
  }
};
