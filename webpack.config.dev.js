var webpack = require('webpack');
var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    contentBase: '/',
    port: 8080,
    stats: { colors: true }
  },
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    './src/scripts/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: "[name].js",
    publicPath: '/'
  },
  module: {
    loaders:[
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.less$/, loader: 'style!css!less' },
      { test: /\.js[x]?$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-0' },
      { test: /\.json$/, loaders: [ 'json' ], exclude: /node_modules/ },
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
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ],
  devtool : 'source-map'
};

