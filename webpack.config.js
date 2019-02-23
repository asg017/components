const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    index: path.resolve(__dirname, "src/index.ts"),
    Glitter: path.resolve(__dirname, "src/components/Glitter.tsx")
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    library: "@codeblog/template",
    libraryTarget: "umd"
  },
  target: "web",
  resolve: {
    extensions: [".wasm", ".mjs", ".js", ".json", ".tsx", ".ts"]
  },
  externals: ["react", "react-dom", "object-assign"],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/react"],
          plugins: ["@babel/plugin-proposal-class-properties"]
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/react", "@babel/typescript"],
          plugins: ["@babel/plugin-proposal-class-properties"]
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: "../"
            }
          },
          { loader: "css-loader", options: { importLoaders: 1 } },
          "postcss-loader"
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(path.resolve(__dirname, "dist"), {
      root: path.resolve(__dirname)
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css"
    })
  ]
};
