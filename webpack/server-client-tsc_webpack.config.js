const nodeExternals = require('webpack-node-externals')
const NodemonPlugin = require('nodemon-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')


const clientConfig = {
  mode: "development",
  // mode: "production",
  devtool: "none",
  entry: "./src/public/index.ts",
  output: {
    path: path.resolve(__dirname, 'dist/public'), // プラグインで出力される場所も設定するので、クライアント側のファイルを全て格納するパスを設定
    filename: 'index[hash].js' // ハッシュをつけることでキャッシュによる動作不良を解消する
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: "ts-loader",
      exclude: /node_modules/,
    }]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/public/index.html"　// トランスパイル元となるファイルを設定
    })
  ]
}

const serverConfig = {
  mode: "development", // <- 圧縮無効 早い
  // mode: "production", // <- 圧縮有効 遅い
  devtool: "none",
  entry: "./src/index.ts",
  output: {
    filename: `server.js`,
    path: `${__dirname}/dist`
  },
  target: "node",
  /* outDirはtsconfig.jsonのものが有効になる */
  node: {
    __dirname: false,
    __firename: false
  },
  externals: [nodeExternals()],
  module: {
    rules: [{
      test: /\.ts$/,
      use: "ts-loader",
      exclude: /node_modules/,
    }]
  },
  plugins: [
    new NodemonPlugin()
  ],
  resolve: {
    extensions: [".ts", ".js"]
  }
}

module.exports = [clientConfig, serverConfig]
