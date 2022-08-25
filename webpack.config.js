const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    'pages/iframe/index': './src/pages/iframe/index.tsx',
    'scripts/background': '/src/scripts/background.ts',
    'scripts/docsie': './src/scripts/docsie.ts',
    'scripts/iframe': './src/scripts/iframe.ts',
    'scripts/picker': './src/scripts/picker.ts',
    'scripts/preview': './src/scripts/preview.ts',
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
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
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
        {
          from: './src/pages/iframe/index.html',
          to: './pages/iframe',
        },
      ],
    }),
  ],
};
