module.exports = [
  {
    test: /\.node$/,
    use: 'node-loader',
  },
  {
    test: /\.(js|ts|tsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader'
    }
  },
  {
    test: /\.(png|jpe?g|gif)$/i,
    loader: 'file-loader',
    options: {
      name: '[path][name].[ext]',
    },
  },
  {
    test: /\.(sass|css|scss)$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: "postcss-loader"
      },
      'sass-loader',
    ]
  }
]