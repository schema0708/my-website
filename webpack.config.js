
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js',
    
  },
  module: {
    rules: [
        {
          test: /\.js$/,
          exclude: '/node_modules',
          loader: 'babel-loader'
        },
        {
          test: /\.css$/i,
          use: ['style-loader','css-loader']
        },
        {
          test: /\.scss$/,
          use: ['style-loader','css-loader', 'sass-loader']
        },
        {
          test: /\.(jpg|png)$/,
          use: {
            loader: 'url-loader'
          }
        },
        {
          test: /\.svg$/,
          use: {
            loader: 'svg-url-loader'
          }
        }
    ]
  },
  
  devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      compress:true,
      port:9000
  }
}

