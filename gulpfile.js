/*
src 参照元を指定
dest 出力さきを指定
watch ファイル監視
series(直列処理)とparallel(並列処理)
*/

const { src, dest, watch, series, parallel } = require('gulp')

//scss
const gulpsass = require("gulp-sass")
const plumber = require("gulp-plumber")    // エラーが発生しても強制終了させない
const notify = require("gulp-notify")      // エラー発生時のアラート出力
const postcss = require("gulp-postcss")    // PostCSS利用
const cleanCSS = require("gulp-clean-css") // 圧縮
const rename = require("gulp-rename")      // ファイル名変更
const sourcemaps = require("gulp-sourcemaps")  // ソースマップ作成
const mqpacker = require('css-mqpacker')     //メディアクエリをまとめる
const autoprefixer = require('autoprefixer')
const flexBugsFixes = require('postcss-flexbugs-fixes') // flexbox バグ対策

//js babel
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

//画像圧縮
const imagemin = require("gulp-imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminPngquant = require("imagemin-pngquant");
const imageminSvgo = require("imagemin-svgo");

const browserSync = require("browser-sync")


//postcss

const postcssOption = [
  flexBugsFixes,
  autoprefixer()
]

//参照元パス
const srcPath = {
  html: 'src/html/**/*.html',
  css: 'src/scss/**/*.scss',
  js: 'src/js/**/*.js',
  img: 'src/images/**/*',
}

//出力先パス
const destPath = {
  html: 'dest/',
  cssMin: 'dest/',
  js: 'dest/js/',
  img: 'dest/images/',
  css: 'src/css/',
}
// プラグインの処理をまとめる

const htmlCopy = (cb) => {
  src(srcPath.html)
    .pipe(dest(destPath.html))
  cb()
}

const cssSass = (cb) => {
  src(srcPath.css) //コンパイル元
    .pipe(sourcemaps.init())
    .pipe(
      plumber(
        {
          errorHandler: notify.onError('Error:<%= error.message %>')
        }
      )
    )
    .pipe(gulpsass({ outputStyle: 'expanded' }))
    .pipe(postcss([mqpacker()])) // メディアクエリをまとめる
    .pipe(postcss(postcssOption)) // 別ファイル　postcssOption
    .pipe(dest(destPath.css))     //コンパイル先 src/css 圧縮前　css確認用
    .pipe(sourcemaps.write('/maps'))  //ソースマップの出力
    .pipe(cleanCSS()) // CSS圧縮
    .pipe(dest(destPath.cssMin))     //コンパイル先　dest/ 圧縮後css
  cb()
}

// babelのトランスパイル、jsの圧縮
const jsBabel = (cb) => {
  src(srcPath.js)
    .pipe(
      plumber(              //エラーが出ても処理を止めない
        {
          errorHandler: notify.onError('Error: <%= error.message %>')
        }
      )
    )
    .pipe(babel({
      presets: ['@babel/preset-env']  // gulp-babelでトランスパイル
    }))
    .pipe(dest(destPath.js))
    .pipe(uglify()) // js圧縮
    .pipe(
      rename(
        { extname: '.min.js' }
      )
    )
    .pipe(dest(destPath.js))
  cb()
}

//画像圧縮（デフォルトの設定）
const imgImagemin = (cb) => {
  return src(srcPath.img)
    .pipe(
      imagemin(
        [
          imageminMozjpeg({
            quality: 80
          }),
          imageminPngquant(),
          imageminSvgo({
            plugins: [
              {
                removeViewbox: false
              }
            ]
          })
        ],
        {
          verbose: true
        }
      )
    )
    .pipe(dest(destPath.img))
  cb()
}

//ローカルサーバー立ち上げ、ファイル監視と自動リロード
const browserSyncFunc = () => {
  browserSync.init(browserSyncOption);
}

const browserSyncOption = {
  server: {
    baseDir: destPath.html,
    proxy: 'localhost',
  },
}

//リロード
const browserSyncReload = (done) => {
  browserSync.reload();
  done();
}

//ファイル監視
const watchFiles = () => {
  watch(srcPath.html, series(htmlCopy, browserSyncReload))
  watch(srcPath.css, series(cssSass, browserSyncReload))
  watch(srcPath.js, series(jsBabel, browserSyncReload))
  watch(srcPath.img, series(imgImagemin, browserSyncReload))
}

// タスクをまとめて実行
exports.default = series(series(htmlCopy, cssSass, jsBabel, imgImagemin, parallel(watchFiles, browserSyncFunc)))
