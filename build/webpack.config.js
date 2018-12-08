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
    three: {
      commonjs: "three",
      commonjs2: "three",
      root: "THREE"
    },
    vue: {
      commonjs: "vue",
      commonjs2: "vue",
      root: "Vue"
    }
  },
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      'src': resolve('src')
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: [resolve('src')]
    }, { 
      test: /\.tsx?$/, loader: ["babel-loader","ts-loader"]
    }]
  }
}
