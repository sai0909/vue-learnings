var webpack = require('webpack');
var Dotenv = require('dotenv-webpack');
var path = require('path');
const { VueLoaderPlugin } = require('vue-loader')


// Naming and path settings
var appName = 'app';
var entryPoint = './app.js';
var exportPath = path.resolve(__dirname, './build');

// Enviroment flag
var plugins = [];
var env = 'dev';

// Differ settings based on production flag
if (env === 'production') {
  var mode = 'production';
  // var UglifyJsPlugin = webpack.optimization;

  // plugins.push(new UglifyJsPlugin({ minimize: true }));
  plugins.push(new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }
  ));

  appName = appName + '.min.js';
} else {
  appName = appName + '.js';
  var mode = 'development';
}

// Main Settings config
console.log(appName, 'checking');
module.exports = {
  mode: mode,
  entry: entryPoint,
  devServer: {
    inline: true,
    port: 8080
  },
  output: {
    path: exportPath,
    filename: appName,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new Dotenv({
      path: path.resolve(__dirname, '.env')
    })  
  ]
};