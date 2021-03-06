var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
/*
  About webpack-dev-server
  its a node js Express server, uses webpack-dev-middleware to serve a webpack bundle
 */
new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath, //here: '/'
    hot: true,
    historyApiFallback: true,
    // It suppress error shown in console, so it has to be set to false.
    quiet: false,
    // It suppress everything except error, so it has to be set to false as well
    // to see success build.
    noInfo: false,
    stats: {
      // Config for minimal console.log mess.
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    }
}).listen(3000, 'localhost', function (err) {
    if (err) {
      console.log(err);
    }

  console.log('webpack dev server listening at localhost:3000');
});