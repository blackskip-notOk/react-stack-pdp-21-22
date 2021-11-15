const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require("webpack");

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.tsx'),
    },
    output: {
        path: path.join(__dirname, 'dist', 'assets'),
        filename: 'bundle.js',
        publicPath: "/"
    },
    mode: 'production',
    optimization: {
        minimizer: [new TerserPlugin({ /* additional options here */})],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "ts-loader"
            },
            {
                test: /\.js$/,
                loader: "source-map-loader"
            },

        ],
    },
    externals: {
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        },),
        new webpack.ProvidePlugin({
            "React": "react",
            "react-dom": "ReactDOM"
        }),
        new CleanWebpackPlugin(),
    ],
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    devtool: "source-map",
}