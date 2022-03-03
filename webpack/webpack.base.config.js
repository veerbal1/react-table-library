const { merge } = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const WebpackBaseConfig = () => {
  return merge([
    {
      entry: './src/index.js',
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            },
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf|json)$/i,
            type: 'asset/resource',
          },
        ],
      },
      output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../dist'),
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './public/index.html',
          filename: 'index.html',
        }),
      ],
    },
  ]);
};

// eslint-disable-next-line new-cap
module.exports = WebpackBaseConfig();
