const webpack = require('webpack');

module.exports = ({ config }) => {
  // Provide React by default (since we don't need it with Emotion)
  config.plugins.push(
    new webpack.ProvidePlugin({
      React: 'react',
    })
  );

  // Enable eslint
  config.module.rules.push({
    test: /\.jsx?$/,
    exclude: /(node_modules|cache)/,
    use: [
      {
        loader: 'eslint-loader',
      },
    ],
  });

  config.node = {
    module: 'empty',
    dgram: 'empty',
    dns: 'mock',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  };

  // Return the altered config
  return config;
};
