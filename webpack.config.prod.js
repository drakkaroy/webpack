const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const ConcatPlugin = require('webpack-concat-plugin');

const entryComponents = require('./app/core/components.json');

module.exports = {
    mode: 'production',
    // entry: entryComponents,
    entry: {
        'app': path.resolve('./app/app')
    },
    output: {
        path: path.resolve('./build'),
        filename: 'assets/js/[name].js',
        chunkFilename: 'assets/js/app-[name].js',
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    module: {
        rules: [
            { test: /\.hbs$/, loader: "handlebars-loader" },
            {
                test: /\.(sa|sc|c)ss$/i,
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
            },
            {
                loader: 'image-webpack-loader',
                options: {
                    mozjpeg: {
                        progressive: true,
                        quality: 65
                    },
                    optipng: {
                        enabled: true,
                    },
                    pngquant: {
                        quality: [0.65, 0.90],
                        speed: 4
                    },
                    gifsicle: {
                        interlaced: false,
                    },
                    webp: {
                        quality: 75
                    }
                }
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
            filename: 'assets/css/app.css',
            chunkFilename: "[id].css"
        // }),
        // new ConcatPlugin({
        //     uglify: false,
        //     sourceMap: false,
        //     name: 'result',
        //     outputPath: 'assets/js/',
        //     fileName: '[name].js',
        //     filesToConcat: ['./app/core/*', './app/app.js', './app/components/**/*.js'],
        //     attributes: {
        //         async: true
        //     }
        })
    ]
}