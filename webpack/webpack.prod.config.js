const webpack = require('webpack');
const { merge } = require('webpack-merge');

// Plugins
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const WebpackBaseConfig = require('./webpack.base.config');

const productionConfig = () => {
  return merge([
    {
      mode: 'production',
      optimization: {
        minimize: true,
        minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
      },
      module: {
        rules: [
          {
            test: /.css$/,
            exclude: /node_modules/,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
          },
        ],
      },
      plugins: [
        new MiniCssExtractPlugin(),
        new webpack.DefinePlugin({
          'isDevelopment': false,
          'process.env': {
            NODE_ENV: JSON.stringify('production'),
          },
        }),
        new CompressionPlugin(),
      ],
    },
  ]);
};

module.exports = () => merge(WebpackBaseConfig, productionConfig());
