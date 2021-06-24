import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

export default {
  entry: ['./web/index.tsx', 'semantic-ui-css/semantic.min.css'],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      }, {
        test: /\.(png|jpe?g|gif|ttf|woff2?|eot|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      }, {
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
  plugins: [
    new HtmlWebpackPlugin({
      title: 'my-react',
      template: join(dirname(fileURLToPath(import.meta.url)), 'web', 'index.html'),
    }),
    new MiniCssExtractPlugin(),
    new BundleAnalyzerPlugin(),
  ],
  output: {
    path: join(dirname(fileURLToPath(import.meta.url)), 'dist', 'web'),
    filename: '[contenthash].js',
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    historyApiFallback: true
  }
}