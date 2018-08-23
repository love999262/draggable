const webpack = require('webpack');
const path = require('path');
const ENV = process.env.NODE_ENV;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
    mode: ENV,
    entry: {
        draggable: path.resolve(__dirname, './src/index.ts'),
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: (ENV === 'dev' || ENV === 'watch') ? 'eval-source-map' : 'inline-source-map',
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
            }, {
                loader: 'ts-loader',
            }, {
                loader: 'tslint-loader',
            }, ],
        }]
    },
    watchOptions: {
        ignored: [/node_modules/]
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, './index.d.ts'),
            to: path.resolve(__dirname, './dist/index.d.ts'),
        }])
    ],
};
if (ENV === 'development') {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.devServer = {
        contentBase: path.resolve(__dirname, 'demo'),
        inline: true,
        host: 'localhost',
        port: 8089,
        open: true,
        hot: true,
        clientLogLevel: 'none',
        quiet: false,
        historyApiFallback: {
            disableDotRule: true
        },
        watchOptions: {
            ignored: /node_modules/
        }
    };
} else {
    config.optimization = {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true,
                extractComments: false,
                uglifyOptions: {
                    compress: {
                        drop_console: true,
                        drop_debugger: true
                    },
                    output: {
                        ascii_only: false
                    }
                }
            })
        ]
    };
}
module.exports = config;