/**
 * @Author: Morgan Andree Ray
 * @Date:   30-04-2018
 * @Email:  info@andreeray.se
 * @Filename: webpack.prod.js
 * @Last modified by:   Morgan Andree Ray
 * @Last modified time: 02-05-2018
 * @License: MIT
 */


 const merge = require('webpack-merge')
 const CleanWebpackPlugin = require('clean-webpack-plugin')
 const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
 const common = require('./webpack.common.js')
 const MiniCssExtractPlugin = require('mini-css-extract-plugin')
 const path = require('path')

 module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../../server/apps/wimseAdmin'),
    },
    plugins: [
        new UglifyJSPlugin(),
        new MiniCssExtractPlugin({ filename: 'app.css' }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
            }
        ],
    },
 })
