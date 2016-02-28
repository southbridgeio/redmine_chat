var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.dev');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    proxy: {
        '/chat-api/*': {
            target: 'http://devlinux/',
            changeOrigin: true
        },
        '/chat/*': {
            target: 'http://devlinux',
            changeOrigin: true,
            ws: true
        }
    }
}).listen(3000, '0.0.0.0', function (err, result) {
    if (err) {
        console.log(err);
    }

    console.log('Dev server listening at localhost:3000');
});
