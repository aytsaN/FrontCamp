const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9001
  },
  mode: "development",
  entry: {
    main: "./src/scripts/index.js",
    polyfill: ['./node_modules/regenerator-runtime/runtime', './node_modules/core-js/es6/promise.js']
  },
  output: {
    path: path.resolve(process.cwd(), "dist"),
    filename: "[name].js",
    chunkFilename: 'chunk-[id].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: ["babel-loader"]
      },
      {
        test: /\.(css|less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
        ]
      }
    ]
  },
   plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ]
};