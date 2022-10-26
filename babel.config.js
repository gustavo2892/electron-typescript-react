module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-typescript',
    ['@babel/preset-react', {
      runtime: 'automatic',
      // importSource: "@emotion/react"
    }]
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', {
      regenerator: true
    }],
    // "@emotion/babel-plugin"
  ]
}
