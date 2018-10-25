const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const isProd = process.env.NODE_ENV === 'production';

function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  mode: isProd ? 'production' : 'development',
  context: path.resolve(__dirname, '../'),
  devtool: isProd ? false : '#cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: 'http://localhost:9003/',
    filename: isProd ?'js/[name].[chunkhash].js' : 'js/[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.css', '.scss'],
    alias: {
      public: resolve('public'),
      '~': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: isProd ? 'img/[name].[hash:7].[ext]' : 'img/[name].[ext]'
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: !isProd
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: !isProd
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !isProd
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 2048,
          name: isProd ? 'fonts/[name].[hash:7].[ext]' : 'fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins: [new VueLoaderPlugin()]
};