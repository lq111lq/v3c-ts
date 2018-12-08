var path = require('path')
var istanbul = require('babel-plugin-istanbul')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  mode: "development", // "production" | "development" | "none"
  devtool: "inline-source-map",
  externals: {
    three: 'three',
    vue: {
      commonjs: "vue",
      commonjs2: "vue",
      root: "Vue"
    }
  },
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      'src': resolve('src'),
      'vue$': 'vue/dist/vue.common'
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ["@babel/preset-env"],
          plugins: [istanbul]
        }
      },
      include: [resolve('src'), resolve('test/util')]
    }, { 
      test: /\.tsx?$/,
      use:[
        
        {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env"],
            plugins: [istanbul]
          }
        },
        {loader: "ts-loader"}
      ],
      include: [resolve('src'), resolve('test/util')]
    }]
  }
}
