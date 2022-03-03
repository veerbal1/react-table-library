const webpack = require('webpack');
const { merge } = require('webpack-merge');
const WebpackBaseConfig = require('./webpack.base.config');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const developmentConfig = () => {
  return merge([
    {
      mode: 'development',
      devtool: 'inline-source-map',
      devServer: {
        host: 'localhost',
        port: 9000,
        hot: true,
      },
      module: {
        rules: [
          {
            test: /\.css$/,
            exclude: /node_modules/,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.[jt]sx?$/,
            exclude: /node_modules/,
            use: [
              {
                loader: require.resolve('babel-loader'),
                options: {
                  plugins: [require.resolve('react-refresh/babel')].filter(Boolean),
                },
              },
            ],
          },
        ],
      },
      plugins: [
        new ReactRefreshWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
      ].filter(Boolean),
    },
  ]);
};

module.exports = () => merge(WebpackBaseConfig, developmentConfig());
