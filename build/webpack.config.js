var path = require('path')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  mode: "development", // "production" | "development" | "none"
  devtool: "inline-source-map",
  entry: './src/index.ts',
  output: {
    path: resolve('dist'),
    filename: 'v3c.umd.js',
    library: 'v3c',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  externals: {
    THREE: 'THREE',
    Vue: 'Vue'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: [resolve('src')]
    }, { 
      test: /\.tsx?$/, loader: "ts-loader" 
    }]
  }
}
