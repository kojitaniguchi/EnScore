// 必要プラグインの読み込み
const gulp = require("gulp")
const webpackStream = require("webpack-stream")
const webpack = require("webpack")
const runSequence = require('run-sequence')

// webpackの設定ファイルの読み込み
const webpackConfig = require("./webpack.config")

gulp.task('client', () => {
  return webpackStream(webpackConfig.client, webpack)
    .pipe(gulp.dest("assets/javascript"))
})

// watch
gulp.task('watch', () => {
  let target = ["./src/assets/*", "./src/assets/*/*", "./src/assets/*/*/*"]
  return gulp.watch(target, ['client'])
})

// default
gulp.task("default", () => {
  runSequence('client','watch' )
})
