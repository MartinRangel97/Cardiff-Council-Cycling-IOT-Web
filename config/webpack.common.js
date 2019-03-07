const path = require('path')

module.exports = {
  entry: {
    home: './client/home/index',
    app: './client/app/index'
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
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.svg$/,
        use: ['svg-inline-loader']
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i,
        use: ['file-loader']
      }
    ]
  },
  target: 'web'
}
