const path = require('path');
const webpack = require('webpack');
const WatchTimePlugin = require('webpack-watch-time-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: {
        app: ['./frontend/Main.jsx']
    },
    output: {
        path: path.resolve(__dirname, './Content'),
        publicPath: '/Content/',
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            use: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.s?css$/,
            use: [
                'style-loader',
                'css-loader',
                'postcss-loader',
                'sass-loader'
            ]
        }, {
            test: /\.(png|jpg|gif|svg|eot|ttf|woff2?)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }]
        }]
    },
    devtool: '#eval-source-map',
    resolve: {
        alias: {
            "root": path.resolve(__dirname, "./frontend"),
            "components": "root/components"
        }
    }
}

module.exports.mode = 'development';

if (process.env.NODE_ENV === 'production') {
    module.exports.mode = 'production'
    
}