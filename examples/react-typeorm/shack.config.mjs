import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

export default {
  entry: ['./web/index.tsx'],
  module: {
    rules: [
      {
        test: /\.(m|c)?(t|j)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-typescript',
              '@babel/preset-react',
              '@babel/preset-env',
            ],
            plugins: [
              "@babel/plugin-transform-runtime",
              [
                "auto-import", {
                  "declarations": [
                    { "default": "React", "path": "react" }
                  ]
                }
              ],
            ]
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".mjs", ".cjs"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: join(dirname(fileURLToPath(import.meta.url)), 'web', 'index.html'),
    }),
    new CleanWebpackPlugin(),
  ],
  output: {
    path: join(dirname(fileURLToPath(import.meta.url)), 'dist', 'web'),
    filename: '[name].[contenthash].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
  }
}