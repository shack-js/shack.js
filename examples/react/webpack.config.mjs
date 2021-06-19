import { resolve } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default {
  entry: './web/index.jsx',
  module: {
    rules: [
      {
        test: /\.(m|c)?jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
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
      },
      {
        test: /[\/|\\]apis[\/|\\].*\.((m|c)?jsx?|tsx?)$/,
        use: {
          loader: '@shack-js/loader-fetch',
          options: {
            apiPrefix: '/apis',
            backendFolder: 'apis',
            sourceType: 'module'
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [".mjs", ".jsx", ".js", ".cjs"]
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'my-react',
    template: resolve(process.cwd(), './web/index.html'),
  })],
  output: {
    path: resolve(process.cwd(), './dist'),
    filename: '[contenthash].js'
  }
}