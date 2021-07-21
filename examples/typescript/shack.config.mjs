import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import ExtraCodeWebpackPlugin from 'extra-code-webpack-plugin'

export default {
  entry: './web/index.ts',
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
  output: {
    path: join(dirname(fileURLToPath(import.meta.url)), 'dist', 'web'),
    filename: '[contenthash].js'
  },
}