import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default {
  entry: './web/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          compilerOptions: {
            module: "ESNext",
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".mjs", ".cjs"]
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'my-react',
    template: join(dirname(fileURLToPath(import.meta.url)), 'web', 'index.html'),
  })],
  output: {
    path: join(dirname(fileURLToPath(import.meta.url)), 'dist', 'web'),
    filename: '[contenthash].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}