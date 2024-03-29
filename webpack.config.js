const path = require("path");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  mode: isDevelopment ? "development" : "production",
  entry: [
    "webpack-dev-server/client?http://0.0.0.0:8080",
    "webpack/hot/only-dev-server",
    "./src/index.tsx",
  ],
  target: "node-webkit",
  output: {
    filename: "bundle.js",
    path: "/dist/",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.tsx?$/,
        include: path.join(__dirname, "src"),
        use: [
          {
            loader: "babel-loader",

            options: {
              plugins: ["@babel/plugin-proposal-optional-chaining", "react-refresh/babel"],
            },
          },
          {
            loader: "ts-loader",
            options: { transpileOnly: true },
          },
        ].filter(Boolean),
      },
    ],
  },
  plugins: [
    isDevelopment && new ReactRefreshPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: "src/plugins/xylophone/assets",
          to: "plugins/xylophone/assets",
        },
      ],
    }),
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "./index.html",
      template: "./src/index.html",
    }),
  ].filter(Boolean),
  devServer: {
    host: "0.0.0.0",
    port: 8080,
    historyApiFallback: true,
    hot: true,
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
};
