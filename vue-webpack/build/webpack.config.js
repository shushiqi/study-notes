const path = require("path")
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //Plugin插件：将css文件提取到单独文件中
// 自动引入生成的js、css文件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 清除上次打包时残留的文件
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const vueLoaderPlugin = require('vue-loader/lib/plugin')
const Webpack = require('webpack')
// const vueLoaderPlugin = require('vue-loader/lib/plugin')


module.exports = {
    mode: "development",
    entry: {
        main: path.resolve(__dirname, '../main.js'),
    },
    output: {
        filename: "[name].[hash:8].js",
        path: path.resolve(__dirname, "../dist")
    },
    //  Webpack 不原生支持解析 CSS 文件,使用Loader机制
    module: {
        rules: [{
                test: /\.vue$/,
                use: ['vue-loader']
            }, {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/, //匹配css文件类型
                // use: ['style-loader', 'css-loader?minimize'], //？传入参数方式 mizimize参数，开启css压缩
                // 或使用对象方式传入参数
                // use: ['style-loader', {
                //     loader: 'css-loader',
                //     options: {
                //         minimize: true
                //     }
                // }]
                use: [MiniCssExtractPlugin.loader, 'css-loader']

            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'img/[name].[hash:8].[ext]'
                            }
                        }
                    }
                }]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'media/[name].[hash:8].[ext]'
                            }
                        }
                    }
                }]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'fonts/[name].[hash:8].[ext]'
                            }
                        }
                    }
                }]
            },
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.runtime.esm.js',
            ' @': path.resolve(__dirname, '../src'),
            // 'components': "./src/components/"
        },
        extensions: ['*', '.js', '.json', '.vue']
    },
    devServer: {
        port: 9527,
        hot: true,
        contentBase: "../dist"
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.html"),
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new vueLoaderPlugin(),
        new Webpack.HotModuleReplacementPlugin(), //配置热更新
    ]
}