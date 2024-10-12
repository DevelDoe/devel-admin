/**
 * @Author: Morgan Andree Ray DevelDoe
 * @Date:   29-04-2018
 * @Email:  info@andreeray.se
 * @Filename: webpack.dev.js
 * @Last modified by:   Morgan Andree Ray
 * @Last modified time: 08-05-2018
 * @License: MIT
 */


 const webpack = require('webpack')
 const path = require('path')
 const merge = require('webpack-merge')
 const common = require('./webpack.common.js')
 const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = merge(common, {
    mode: 'development',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'build'),
    },
    devtool: 'inlinesourcemap',
    devServer: {
        contentBase: path.join(__dirname, "build"),
        compress: false,
        inline: true,
        port: 8070
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        // Adds CSS to the DOM by injecting a `<style>` tag
                        loader: 'style-loader'
                    },
                    {
                        // Interprets `@import` and `url()` like `import/require()` and will resolve them
                        loader: 'css-loader'
                    },
                    {
                        // Loader for webpack to process CSS with PostCSS
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    {
                        // Loads a SASS/SCSS file and compiles it to CSS
                        loader: 'sass-loader'
                    }
                ]
            }
        ],
    },
    plugins: [
        new CleanWebpackPlugin( 'build' ,  {
          root:     path.resolve(__dirname),
          exclude:  [''],
          verbose:  true,
          dry:      false
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
})
//
