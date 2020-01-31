const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    // mode: 'development',
    entry: './app/app',
    output: {
        path: __dirname + '/build',
        filename: 'app.js'
    },

    devServer: {
        port: 5000
    },

    module: {
        rules: [
            { test: /\.hbs$/, loader: "handlebars-loader" },
            {
                test: /\.scss$/i,
                // esta opcion mete el css dentro del js
                // use: ['style-loader', 'css-loader', 'sass-loader']
                // esta opcion extrae el css a un file separad0
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
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
            filename: 'app.css'
        })
    ]
}