const path = require('path');

module.exports = {
  entry: {
    app: './js/app.ts', // TypeScriptのエントリーポイントに変更
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: './js/app.js',
  },
  resolve: {
    extensions: ['.ts', '.js'], // .tsと.jsの拡張子をサポート
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // .tsファイルを対象
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
