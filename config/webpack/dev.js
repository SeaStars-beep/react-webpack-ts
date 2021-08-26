const commonConfig = require('./__common__');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  merge
} = require('webpack-merge');
const {
  getServer
} = require('./__helpers__');

module.exports = merge(commonConfig, {
  entry: './src/main.HMR.ts',
  devtool: 'inline-source-map',
  mode: 'development',
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '../../dist'),
  },
  devServer: getServer(
    '#/?selfId=Orvay1rVsoU9nlpY&pro-token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDAyMjg0NTQiLCJvcyI6IjUiLCJwaG9uZSI6IjEzOTM5Nzk5NTAxIiwib3BlbklkIjoib3BBSnY1VnhhVFZXV2VhdGVHa3NlSDB5cVJ6QSIsImlzcyI6ImVsZXBoYW50X2ludGVncmFsIiwiZGlkIjoib3BBSnY1VnhhVFZXV2VhdGVHa3NlSDB5cVJ6QSJ9.WbNRXgr6icyzXf80DNHQotz9pbz-G3-ipCANHaGxKiQ',
    process.env.API_BACK,
    process.env.PORT,
  ),     
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.ejs',
      templateParameters: {
        title: '特惠洗车',
      },
    }),
  ],
});