/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');

const sourceMap = true;

const cssLoader = {
  loader: 'css-loader',
  options: {
    importLoaders: 1,
    modules: {
      // name is the filename, which is slightly annoying, but it's still better than the default hash
      localIdentName: '[name]__[local]--[hash:base64:5]',
    },
    sourceMap,
  },
};

const sassLoader = { loader: 'sass-loader', options: { sourceMap } };

module.exports = {
  entry: './src/index.tsx',
  devtool: 'source-map',
  mode: 'development',
  devServer: {
    port: process.env.PORT ?? 3000,
    // somewhat annoyingly the proxy setup did not work, even though
    // we use it every day with CRA and webpack 4 just fine...
    // proxy: ...
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      hash: true,
      filename: '../dist/index.html',
      favicon: './public/favicon.ico',
    }),
    new DefinePlugin({
      // let's hope babel is fine with this, I'm not 200% sure though
      // (just like a significant portion of the interwebs)...
      API_URL: JSON.stringify(process.env.API_URL),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.module\.scss$/i,
        use: ['style-loader', cssLoader, sassLoader],
      },
      {
        test: /\.scss$/i,
        exclude: /\.module\.scss$/i,
        use: ['style-loader', cssLoader, sassLoader],
      },
      {
        test: /\.css$/,
        use: ['style-loader', cssLoader],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(ts|tsx)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.tsx'],
  },
};
