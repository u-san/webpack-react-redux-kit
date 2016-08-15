var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var srcPath = path.resolve(__dirname, './src');

var entries = getEntries();
var chunks = Object.keys(entries);

var config = {
  entry: entries,
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: "[name].js",
    chunkFilename: '[chunkhash:8].chunk.js',
    publicPath: '/'
  },
  module: {
    loaders:[
      { 
        test: /\.css$/, 
        loader: 'style!css', 
        exclude: /node_modules/ 
      },
      { test: /\.less$/,
        loader: 'style!css!less', 
        exclude: /node_modules/ 
      },
      { test: /\.js[x]?$/, 
        loader: 'babel-loader',  
        query: {
          presets: ['es2015', 'react', 'stage-0'],
        },
        exclude: /node_modules/ 
      },
      { 
        test: /\.json$/, 
        loaders: [ 'json' ], 
        exclude: /node_modules/ 
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'url-loader?limit=2&minetype=image/jpg&name=./images/[name]_[hash].[ext]'
      },
      {
        test: /\.(eot|ttf|svg|woff)\??.*$/i,
        loader: 'file?name=fonts/[name].[ext]'
      },
    ]
  },
  resolve: {
      extensions: ['', '.js'],
      root: './src',
      alias: {}
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    contentBase: '/',
    port: 8080,
    stats: { colors: true }
  },
  devtool : 'source-map'
};


function getEntries() {
  var jsPath = path.resolve(srcPath, 'scripts');
  var names = fs.readdirSync(jsPath);
  var map ={};

  names.forEach(function(name) {
      var m = name.match(/(.+)\.js$/);
      var entry = m ? m[1] : '';
      var entryPath = entry ? path.resolve(jsPath, name) : '';

      if (entry) map[entry] = entryPath;
  });
  return map;
}

 // 自动生成入口文件，入口js名必须和入口文件名相同
(function getHtml() {
  var pages = fs.readdirSync(srcPath);

  pages.forEach(function(filename) {
    var m = filename.match(/(.+)\.html$/);

    if (m) {
      var conf = {
          template: path.resolve(srcPath, filename),
          filename: filename
      };

      if (m[1] in config.entry) {
          conf.inject = 'body';
          conf.chunks = ['common', m[1]];
      }

      config.plugins.push(new HtmlWebpackPlugin(conf));
    }
  });
})();

module.exports = config;
