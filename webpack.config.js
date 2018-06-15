const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'client/src/index.jsx'),
  output: {
    path: path.join(__dirname, 'client/dist/compiled'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.worker\.js$/,
        use: {
          loader: 'worker-loader',
          options: { publicPath: '/compiled/' },
        },
      },
      {
        test: /.txt$/,
        use: {
          loader: 'raw-loader',
        },
      },
    ],
  },
  mode: 'development',
  resolve: { extensions: ['.js', '.jsx'] },
};
