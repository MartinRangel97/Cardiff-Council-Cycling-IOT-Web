const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

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
        use: [{
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [{
                cleanupIDs: {
                  prefix: {
                    toString () {
                      // Ref: https://github.com/svg/svgo/issues/674#issuecomment-328774019
                      this.counter = this.counter || 0
                      return `id-${this.counter++}`
                    }
                  }
                }
              }]
            }
          }
        }]
      },
      {
        test: /\.(jpe?g|png|gif|ico|woff|woff2)$/i,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: './client/static',
        to: 'static/',
        toType: 'dir'
      }
    ])
  ],
  target: 'web'
}
