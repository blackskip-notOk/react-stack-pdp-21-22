const path = require('path');
const HTMLWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin").default;
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const webpack = require("webpack");

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: "all"
        },
    };

    if (isProd) {
        config.minimizer = [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]
    };

    return config;
};

const fileName = ext => isDev ? `[name].${ext}` : `[name].[chunkhash:8].${ext}`;

const cssLoaders = extra => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
            }
        },
        "css-loader",
    ]

    if (extra) {
        loaders.push(extra);
    }

    return loaders;
}

module.exports = {
    mode: 'development',
    devServer: {
        port: 5555,
        hot: isDev
    },
    entry: {
        main: ["@babel/polyfill", path.resolve(__dirname, './src/index.tsx')],
    },
    output: {
        filename: fileName("js"),
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/"
    },
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", "json", ".png"],
        alias: {
            '@': path.resolve(__dirname, "src"),
            '@components': path.resolve(__dirname, "./src/components")
        }
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./public/index.html",
            minify: {
                collapseWhitespace: isProd
            }
        },),
        new webpack.ProvidePlugin({
            "React": "react",
            "react-dom": "ReactDOM"
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "public/icon/favicon.png"),
                    to: path.resolve(__dirname, "dist")
                }
            ],
        }),
        new MiniCssExtractPlugin({
            filename: fileName("css"),
        }),
        new CssMinimizerPlugin(),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                       presets: [
                           "@babel/preset-env"
                       ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.less$/,
                use: cssLoaders("less-loader")
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders("sass-loader")
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
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                use: ["file-loader"]
            },
            {
                test: /\.(ttf|woff|woff|eot)$/,
                use: ["file-loader"]
            },
            {
                test: /\.xml$/,
                use: ["xml-loader"]
            },
            {
                test: /\.csv$/,
                use: ["csv-loader"]
            }
        ],
    },
    externals: {
    },
    optimization: optimization(),
    devtool: "source-map",
}