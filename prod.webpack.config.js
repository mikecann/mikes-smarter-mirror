const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.tsx",
  },
  target: "node-webkit",
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
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
  performance: {
    hints: false,
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "src/prod.package.json", to: "package.json" }],
    }),
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "./index.html",
      template: "./src/index.html",
    }),
  ],
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
};
