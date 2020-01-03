const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  // production, development, none
  mode: 'development',
  entry: './frontend_sources/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../frontend_sources')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader'
          }
        }
      },
      {
        test: /\.css/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    modules: [
      'node_modules'
    ],
    alias: {
      vue: 'vue/dist/vue.common.js'
    }
  },
  plugins: [new VueLoaderPlugin()]
};
