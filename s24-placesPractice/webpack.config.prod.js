const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'production', //burasını
  entry: {
    SharePlace: './src/SharePlace.js',
    MyPlace: './src/MyPlace.js',
  },
  output: {
    filename: '[name].[contenthash].js', // burasını
    path: path.resolve(__dirname, 'dist', 'assets', 'scripts'),
    publicPath: 'dist/assets/scripts/',
  },
  devtool: 'cheap-source-map', // burasını
  devServer: {
    contentBase: './',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                { useBuiltIns: 'usage', corejs: { version: 3 } },
              ],
            ],
          },
        },
      },
    ],
  },
  plugins: [new CleanPlugin.CleanWebpackPlugin()],
};
