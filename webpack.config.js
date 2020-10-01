const path = require("path");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");

module.exports = () => {
    // const env = dotenv.config().parsed;

    // const envKeys = Object.keys(env).reduce((prev, next) => {
    //     prev[`process.env.${next}`] = JSON.stringify(env[next]);
    //     return prev;
    // }, {});

    return {
        entry: "./src/index.js",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "bundle.js",
            chunkFilename: "[id].js",
            publicPath: "",
        },
        resolve: {
            extensions: [".js", ".jsx"],
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: "babel-loader",
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: [
                        { loader: "style-loader" },
                        {
                            loader: "css-loader",
                            options: {
                                modules: {
                                    localIdentName:
                                        "[name]__[local]___[hash:base64:5]",
                                },
                                sourceMap: true,
                                import: true,
                            },
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                ident: "postcss",
                                plugins: () => [autoprefixer({})],
                            },
                        },
                    ],
                },
                {
                    test: /\.(png|jpe?g|gif)$/,
                    loader: "url-loader?limit=10000&name=img/[name].[ext]",
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: __dirname + "/src/index.html",
                filename: "index.html",
                inject: "body",
            }),
            // new webpack.DefinePlugin(envKeys),
        ],
    };
};
