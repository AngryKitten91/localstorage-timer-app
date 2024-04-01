const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js", // Plik główny
  output: {
    path: path.resolve(__dirname, "docs"),
    filename: "bundle.js",
  },
  devServer: {
    static: { directory: path.join(__dirname, "docs") },
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.scss$/, // Rozpoznaje pliki .scss
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Szablon HTML
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css", // Nazwa wyjściowego pliku CSS
    }),
  ],
};
