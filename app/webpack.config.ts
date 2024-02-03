import path from 'path';
import { Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// @ts-ignore
import sassResources from './src/assets/scss/_utilities';

const config: Configuration = {
    mode: 'development',
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(scss|css)$/,
                exclude: /node_modules/,
                include: /\.module\.scss$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]-[hash:base64:5]'
                            },
                            importLoaders: 2
                        }
                    },
                    { loader: 'postcss-loader' },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            sourceMap: true,
                            resources: sassResources.map((file: any) =>
                                // eslint-disable-next-line no-undef
                                path.resolve(__dirname, './src/assets/scss/_utilities/', file)
                            )
                        }
                    }
                ]
            },
            {
                test: /\.(scss|css)$/,
                exclude: /\.module\.scss$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' },
                    { loader: 'postcss-loader' },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            sourceMap: true,
                            resources: sassResources.map((file: any) =>
                                // eslint-disable-next-line no-undef
                                path.resolve(__dirname, './src/assets/scss/_utilities/', file)
                            )
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new MiniCssExtractPlugin({
            chunkFilename: '[id].css',
            filename: '[name].css'
        })
    ]
};

export default config;
