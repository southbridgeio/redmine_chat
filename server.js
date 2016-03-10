var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.dev');

const REDMINE_URL = process.env.REDMINE_URL || 'http://devlinux/'
new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    proxy: {
        '/redmine-chat/*': {
            target: REDMINE_URL,
            changeOrigin: true
            // ws: true
        },
        '/login': {
            target: REDMINE_URL,
            changeOrigin: true
        },
        '/chat-api/*': {
            target: REDMINE_URL,
            changeOrigin: true
        }
    }
}).listen(3000, '0.0.0.0', function (err, result) {
    if (err) {
        console.log(err);
    }

    console.log('Dev server listening at localhost:3000');
});
