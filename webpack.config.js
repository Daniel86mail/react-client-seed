
const path = require('path');
const webpack = require('webpack');


// plugins
const HtmlWebPackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const MinifyPlugin = require("babel-minify-webpack-plugin");

const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = () => {
    const ENV = process.env.ENVIRONMENT_TYPE || 'local';
    const isProd = ENV !== 'local';
    const isLocal = ENV === 'local';
    const ifAnalyzer = x => process.env.analyze && x;
    const removeEmpty = arr => arr.filter(Boolean);


    return {
        /**
         * @description - An entry point indicates which module webpack should use to begin building out its internal dependency graph
         * @docs - https://webpack.js.org/concepts/entry-points/
         */
        entry: {
            app: './src/index.js'
        },
        /**
         * @description - The output property tells webpack where to emit the bundles it creates and how to name these files
         * @docs - https://webpack.js.org/concepts/#output
         */
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].js'
        },
        /**
         * @description - Providing the mode configuration option tells webpack to use its built-in optimizations accordingly.
         * @docs - https://webpack.js.org/concepts/mode/
         */
        mode: isLocal ? 'development' : 'production',

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        // @description - Webpack helper to transform your JavaScript dependencies with Babel.
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        isLocal ? {
                            // Adds CSS to the DOM by injecting a <style> tag
                            // @docs - https://github.com/webpack-contrib/style-loader
                            loader: 'style-loader'
                        } : MiniCssExtractPlugin.loader, {
                            // interprets @import and url() like import/require() and will resolve them.
                            // @docs - https://github.com/webpack-contrib/css-loader
                            loader: 'css-loader',
                            options: {
                                // enables / disables the CSS Modules spec and setup basic behaviour.
                                modules: false,
                                // enables / disables source maps set.
                                sourceMap: true,
                                // configure how many loaders before css-loader should be applied to @import
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                }
            ]
        },

        optimization: {
            minimizer: [
                new OptimizeCSSAssetsPlugin({})
            ]
        },

        plugins: removeEmpty([

            /**
             * @description - A Webpack Plugin for babel-minify - A babel based minifier
             * @docs - https://github.com/webpack-contrib/babel-minify-webpack-plugin
             */
            new MinifyPlugin(),

            new webpack.DefinePlugin({
                'process.env.ENVIRONMENT_TYPE': JSON.stringify('production')
            }),

            /**
             * @description - Plugin that simplifies creation of HTML files to serve your bundles
             * @docs - https://github.com/jantimon/html-webpack-plugin
             */
            new HtmlWebPackPlugin({
                template: './src/index.html',
                filename: './index.html'
            }),

            /**
             * @description - This plugin extracts CSS into separate files.
             * @docs - https://github.com/webpack-contrib/mini-css-extract-plugin
             */
            new MiniCssExtractPlugin({
                filename: '[name].css',
            }),

            /**
             * @description  - Visualize size of webpack output files with an interactive zoomable treemap.
             * @docs - https://www.npmjs.com/package/webpack-bundle-analyzer
             */
            ifAnalyzer(new BundleAnalyzerPlugin())
        ]),


        /**
         * @description - This option controls if and how source maps are generated.
         * @docs - https://webpack.js.org/configuration/devtool/#devtool
         */
        devtool: isProd ? false : 'eval-source-map',

        /**
         * @description - Simple local server
         * @docs - https://webpack.js.org/configuration/dev-server/#devserver
         */
        devServer: {
            port: 9000,
            // @description - open web browser
            open: true,
            historyApiFallback: true,
        }
    };
};
