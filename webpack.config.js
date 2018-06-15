const path = require('path');

const fs = require('fs');
const WebpackOnBuildPlugin = require('on-build-webpack');

const buildDir = path.join(__dirname, 'client/dist/compiled');

/* eslint no-new: 0 */


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
  plugins: [
    // remove old worker files
    new WebpackOnBuildPlugin((stats) => {
      const newlyCreatedAssets = stats.compilation.assets;

      const unlinked = [];
      fs.readdir(buildDir, (err, files) => {
        files.forEach((file) => {
          if (!newlyCreatedAssets[file]) {
            fs.unlink(path.resolve(`${buildDir}/${file}`), (error) => {
              if (error) throw error;
            });
            unlinked.push(file);
          }
        });

        if (unlinked.length > 0) {
          console.log('Removed old assets: ', unlinked);
        }
      });
    }),
  ],
  mode: 'development',
  resolve: { extensions: ['.js', '.jsx'] },
};
