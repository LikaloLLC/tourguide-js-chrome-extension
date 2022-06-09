const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    'scripts/background': '/src/scripts/background.ts',
    'scripts/picker': './src/scripts/picker.ts',
  },
  output: {
    clean: true,
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: './src/manifest.json',
          to: '.',
        },
        {
          from: './src/images',
          to: './images',
        },
      ],
    }),
  ],
};
