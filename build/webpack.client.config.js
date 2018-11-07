const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const SWPrecachePlugin = require('sw-precache-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';

const config = merge(base, {
  entry: {
    app: './src/entry-client.js'
  },
  resolve: {},
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
      'process.env.VUE_ENV': '"client"'
    }),
    new VueSSRClientPlugin()
  ]
});

if (isProd) {
  config.plugins.push(
    // auto generate service worker
    new SWPrecachePlugin({
      cacheId: 'vue-ssr',
      filename: 'sw.js',
      minify: true,
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/api.mimei.net.cn\/api\/*/,
          handler: 'networkFirst',
          options: {
            cache: {
              name: 'api',
              maxEntries: 20,
              maxAgeSeconds: 86400
            }
          }
        },
        {
          urlPattern: /^http:\/\/localhost:9003\/item\/*|^http:\/\/localhost:9003$/,
          handler: 'networkFirst',
          options: {
            cache: {
              name: 'page'
            }
          }
        },
        {
          urlPattern: /\.(png|jpg|gif|svg|ico)$/,
          handler: 'cacheFirst',
          options: {
            cache: {
              name: 'image',
              maxAgeSeconds: 604800
            }
          }
        }
      ]
    })
  );

  config.optimization = {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          name: 'vendors',
          priority: 10,
          enforce: true,
          chunks: 'all'
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    },
    minimizer: [
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: {
            drop_console: true
          },
          output: {
            comments: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          safe: true,
          autoprefixer: {
            remove: false
          }
        }
      })
    ],
    hashedModuleIds: true
  };
}

module.exports = config;
