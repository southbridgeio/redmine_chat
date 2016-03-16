var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: [
        './src/index'
    ],
    resolve: {
        modules: [
            path.resolve('./src'),
            'node_modules'
        ]
    },
    output: {
        library: '__REDMINE_CHAT__',
        libraryTarget: 'var',
        path: path.resolve('./assets/'),
        filename: 'javascripts/chat.js',
        publicPath: '/plugin_assets/redmine_chat/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            minimze: true,
            debug: false
        }),
        new webpack.optimize.DedupePlugin(),
        new ExtractTextPlugin('./stylesheets/chat.css', {
            allChunks: true
        }),
        new webpack.ProvidePlugin({
                'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel'],
                exclude: /node_modules/,
                include: path.join(__dirname, 'src')
            },
            {
                test: /^((?!\.module).)*css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.module.css?$/, 
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'),
                exclude: '/node_modules/'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&minetype=application/font-woff&name=fonts/[name].[ext]'
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            },
            {
                test: /\.(mp3)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=sounds/[name].[ext]'
            }
        ]
    }
};
