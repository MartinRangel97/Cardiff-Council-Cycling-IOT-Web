const path = require('path')

module.exports = {
  entry: {
    app: './client/app/index',
    home: './client/home/index'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../public'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.svg$/,
        use: ['svg-inline-loader']
      },
      {
        test: /\.(jpe?g|png|gif|ico|woff|woff2)$/i,
        use: ['file-loader']
      }
    ]
  },
  target: 'web'
}
