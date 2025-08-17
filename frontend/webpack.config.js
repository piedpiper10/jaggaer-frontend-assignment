const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // where bundling starts
  output: {
    path: path.resolve(__dirname, "dist"), // build folder
    filename: "bundle.js", // output bundle name
    clean: true,
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // for JS/JSX files
        exclude: /node_modules/,
        use: "babel-loader", // runs Babel
      },
      {
        test: /\.css$/, // import CSS from JS
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"], // allow imports without ext
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // base HTML template
    }),
  ],
  devServer: {
    static: [
      {
        directory: path.resolve(__dirname, "public"),
        publicPath: "/", // serves /assets/smartphone.jpg
        watch: true,
      },
    ],
    //historyApiFallback: true,
    historyApiFallback: {
      rewrites: [{ from: /./, to: "/index.html" }],
      index: "index.html",
    },
    port: 3000,
    hot: true, // Hot Module Replacement
    open: true, // auto-open browser
  },
  mode: "development", // faster builds, better DX
};
