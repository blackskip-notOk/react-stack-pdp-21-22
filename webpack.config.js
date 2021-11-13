const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'src/index.tsx'),
    },
    output: {
        path: path.join(__dirname, 'dist', 'assets'),
        filename: 'bundle.js',
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
        "react": "React",
        "react-dom": "ReactDOM"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
    ],
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    devtool: 'source-map'
}