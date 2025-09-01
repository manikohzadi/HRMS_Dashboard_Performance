'use strict'

const path = require('path')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/js/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true // پاک کردن dist قبل از build جدید
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 8080,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' })
  ],
  module: {
    rules: [
      // SCSS
      {
        test: /\.(scss)$/,
        use: [
          'style-loader',   // Inject CSS to DOM
          'css-loader',     // Turns CSS into JS
          {
            loader: 'postcss-loader', // PostCSS + Autoprefixer
            options: {
              postcssOptions: {
                plugins: [autoprefixer]
              }
            }
          },
          {
            loader: 'sass-loader', // Compiles Sass to CSS
            options: {
              sassOptions: {
                silenceDeprecations: ['mixed-decls','color-functions','global-builtin','import']
              }
            }
          }
        ]
      },
      // CSS ساده (مثل bootstrap-icons)
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      // فونت‌ها و SVGها
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]' // قرار گرفتن فونت‌ها در dist/fonts
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.scss', '.css']
  }
}
