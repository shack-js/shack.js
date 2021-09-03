import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

export default {
  entry: './web/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-typescript',
              '@babel/preset-env',
            ],
            plugins: [
              "@babel/plugin-transform-runtime",
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
    new CleanWebpackPlugin(),
  ],
  output: {
    path: join(dirname(fileURLToPath(import.meta.url)), 'dist', 'web'),
    filename: '[name].[contenthash].js',
  }
}