import path from "path";
import { Configuration } from "webpack";
import CopyWebpackPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';


const config: Configuration = {
  mode:
    (process.env.NODE_ENV as "production" | "development" | undefined) ??
    "development",
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
          test: /\.(scss|css)$/,
          exclude: /node_modules/,
          include: /\.module\.scss$/,
          use: [
              { loader: MiniCssExtractPlugin.loader },
              {
                  loader: 'css-loader',
                  options: {
                      modules: {
                          localIdentName: 'browse-[local]-[hash:base64:5]',
                      },
                      importLoaders: 2,
                  },
              },
              { loader: 'postcss-loader' }, {
                  loader: 'sass-loader',
                  options: {
                      sourceMap: true,
                  },
              }
          ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: './public/index.html'
      })
  ],
};

export default config;
