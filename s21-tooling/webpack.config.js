const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'assets', 'scripts'),
    publicPath: 'assets/scripts/',
  },
  devtool: 'cheap-module-eval-source-map',
  // devServer: {
  //   contentBase: './',
  // },
  plugins: [new CleanPlugin.CleanWebpackPlugin()],
};

// giriş noktasını belirledik
// çıkış noktası için path ı çağırdık
// __dirname, 'assets', 'scripts' ->>>> config dosya konumu/assets/scripts demek aslında
// lazy loading için publicPath i ekledik
// devtool a ekleyerek breakpoint koyabiliriz
