const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // where bundling starts
  output: {
    path: path.resolve(__dirname, 'dist'), // build folder
    filename: 'bundle.js',                 // output bundle name
    clean: true,                           // wipe dist before builds
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,               // for JS/JSX files
        exclude: /node_modules/,
        use: 'babel-loader',               // runs Babel
      },
      {
        test: /\.css$/,                    // import CSS from JS
        use: ['style-loader', 'css-loader']
        // css-loader resolves @import/url()
        // style-loader injects CSS into <style> tags at runtime
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],           // allow imports without ext
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',     // base HTML template
    }),
  ],
  devServer: {
    static: { directory: path.join(__dirname, 'dist') }, // files to serve
    //historyApiFallback: true,
    historyApiFallback: {
      rewrites: [{ from: /./, to: '/index.html' }],
      index: 'index.html',
    },
    port: 3000,
    hot: true,                             // Hot Module Replacement
    open: true,                            // auto-open browser
  },
  mode: 'development',                     // faster builds, better DX
};
