/* eslint-disable @typescript-eslint/no-var-requires */
const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');
const path = require("path");

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

module.exports = {
  target: 'electron18-renderer',
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    alias: {
      '@': path.join(__dirname, './src/'),
      'assets': path.join(__dirname, './assets/'),
    },
  },
};
