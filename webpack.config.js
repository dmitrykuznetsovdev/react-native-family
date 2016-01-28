'use strict'

var path         = require('path');
var webpack      = require('webpack');
var _            = require('lodash');


var appPath       = path.join(__dirname, 'src'),
    assetsPath    = path.join(appPath, 'assets');

var aliases = {
  _app: appPath,
  _assets: assetsPath,
  _data: path.join(appPath, 'data'),
  _modules: path.join(appPath, 'modules'),
  _components: path.join(appPath, 'components'),
  _screens: path.join(appPath, 'screens'),
  _moduleDAL: path.join(appPath, 'module_dal'),
  _services: path.join(appPath, 'module_dal/services'),
  _actions: path.join(appPath, 'module_dal/actions'),
  _reducers: path.join(appPath, 'module_dal/reducers'),
  _middleware: path.join(appPath, 'module_dal/middleware'),
  _utils: path.join(appPath, 'utils')
};


var DEBUG  = process.env.NODE_ENV !== 'production' ? true : false;

var baseConfig = {
  debug: true,
  devtool: 'eval',
  devServer: {
    contentBase: './src',
    info: true,
    hot: false,
    inline: true,
    historyApiFallback: true,
    //proxy: {'*': 'http://192.168.33.10/'}
  },
  entry: {
    'index.ios': ['./src/main.ios.js'],
    'index.android': ['./src/main.android.js']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  resolve: {
    alias: aliases
  },
  module: {
    /*preLoaders: [
      {
        test: /\.(js|jsx|es6)$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'eslint-loader'
      }
    ],*/
    loaders: [
      {
        test: /\.js$/,
        include: /node_modules\/react-native/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'stage-1', 'react']
        }
      },
      {
        test: /\.(js|jsx|es6)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'stage-1', 'react']
        }
      }
    ]
  },
  plugins : [
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};

/**
 *
 * @type {{context: *, debug: boolean, devtool: string, module: {plugins: *[]}, output: {publicPath: string}}}
 */
var productionConfig = {
  context: __dirname,
  debug: false,
  devtool: 'cheap-source-map',
  output: {publicPath: '/'},
  module: {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        comments: true,
        minimize: true,
        drop_console: true,
        warnings: false
      }),
      new webpack.optimize.OccurrenceOrderPlugin(true),
      new webpack.optimize.DedupePlugin()
    ]
  }
}

if (process.env.NODE_ENV == 'production') {
  baseConfig = _.merge(baseConfig, productionConfig);
}


module.exports = baseConfig;
