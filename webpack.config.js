const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
    mode: 'development',
    entry: './app/app',
    output: {
        path: path.join(__dirname + '/build'),
        filename: 'assets/js/[name].app.js'
    },

    devServer: {
        port: 8080
    },

    module: {
        rules: [
            { test: /\.hbs$/, loader: "handlebars-loader" },
            {
                test: /\.(sa|sc|c)ss$/i,
                // esta opcion mete el css dentro del js
                // use: ['style-loader', 'css-loader', 'sass-loader']
                // esta opcion extrae el css a un file separad0
                use: [
                    MiniCssExtractPlugin.loader, 
                    'css-loader', 
                    {
                        loader: 'postcss-loader',
                        options: {
                            autoprefixer: {
                                brower: ["last 2 versions"]
                            },
                            plugins: () => {
                                autoprefixer
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpg|png|gif|jpeg)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/images/',
                            useRelativePath: true
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
              handlebarsLoader: {}
            }
        }),
        new HtmlWebpackPlugin({
            template: './app/index.hbs'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/css/app.css'
        })
    ],
}