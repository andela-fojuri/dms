const webpack = require('webpack');
const path = require('path');

module.exports = {
  debug: true,
  devtool: 'inline-source-map',
  noInfo: false,
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true', // note that it reloads the page if hot module reloading fails.
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

  devServer: {
    contentBase: path.resolve(__dirname, 'client')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
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
      { test: /\.js|jsx$/, include: path.join(__dirname, 'client'), loaders: ['babel'] },
      { test: /(\.css)$/, loaders: ['style', 'css'] },
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
      }
    ]
  }
};
