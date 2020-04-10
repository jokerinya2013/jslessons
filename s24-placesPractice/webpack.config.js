const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    SharePlace: './src/SharePlace.js',
    MyPlace: './src/MyPlace.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist', 'assets', 'scripts'),
    publicPath: 'assets/scripts/',
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist', //dneme
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { useBuiltIns: 'usage', corejs: { version: 3 } }]],
          },
        },
      },
    ],
  },
  plugins: [new CleanPlugin.CleanWebpackPlugin()],
};
// kurulum...
// 1. npm init ile ilk kurulumu yap
// 2. package ları yükleyeceğiz. isteğe bağlı eslint yükleyeceğiz
// 3. webpack ve webpack-cli i dev olarak yükleyeceğiz.
// 4. webpack.config.js ve webpack.config.prod.js i yazıyoruz. (dosya konum ve modlara dikkat)
// 5. dev olarak webpack-dev-server ı yükleyeceğiz
// 6. dev olarak clean-webpack-plugin ı yükleyeceğiz, config dosylarında plugin olarak tanımla,
// 7. babel ı ve bağlıları olan, core-js ile regenerator-runtime ı indirdik dev olarak yine
// 8. bunlarla ilgili config file ayarlamaları yapıyoruz
