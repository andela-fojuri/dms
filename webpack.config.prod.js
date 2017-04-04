const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  debug: true,
  devtool: 'cheap-module-eval-source-map',
  noInfo: false,
  entry: [
    path.resolve(__dirname, 'client/index')
  ],
  target: 'web',
  output: {
    path: `${__dirname}/dist`, // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },

  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },

  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Hammer: 'hammerjs/hammer'
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      jquery: path.join(__dirname, 'node_modules/jquery/dist/jquery'),
    }
  },
  module: {
    loaders: [
      { test: /\.js$/, include: path.join(__dirname, 'client'), loaders: ['babel'] },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
      {
        test: /\.(jpg|png|svg|jpeg)$/,
        loader: 'url-loader',
        options: {
          limit: 25000,
        },
      },
      { test: /materialize-css\/bin\//, loader: 'imports?jQuery=jquery,$=jquery,hammerjs' },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
    ]
  }
};
