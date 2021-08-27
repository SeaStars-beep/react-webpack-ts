const path = require('path');
// const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // css抽离
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');// css压缩

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(less|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf|otf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
              name: '[name].[contenthash].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@src': path.resolve(__dirname, '../../src'),
      '@assets': path.resolve(__dirname, '../../assets'),
    },
  },
  plugins: [
    new Dotenv(),
    new MiniCssExtractPlugin({
      filename: 'css/[name][hash].css'
    }),
    new CssMinimizerPlugin()
  ],
  optimization: { // https://webpack.docschina.org/plugins/split-chunks-plugin/  公共模块抽离
    splitChunks: {
      // include all types of chunks
      chunks: 'all',
    },
  },
  
};
