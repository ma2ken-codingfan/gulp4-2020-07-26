# Basic html-css-template gulp4

## 参考 url

[Sassのモジュールシステムを@importから@useに移行する方法を考えてみた](https://parashuto.com/rriver/development/sass-module-system-from-import-to-use#about-new-sass-module-system)

[HTMLコーダーにとっての2020年アンケート結果から分析するイマドキのウェブ制作](https://ics.media/entry/200710/)

## sass Directory structure

Base Flocss

```

Foundation　サイト全体のデフォルトスタイルを管理。
├ vender  flamework
  ├ sanitize.scss  reset
├ basic   全体的な共通スタイル
  ├ base.scss
  ├ header.scss
  ├ topNav.scss
  ├ slider.scss
  ├ contents.scss
  ├ main.scss
  ├ sidebar.scss
  ├ footer.scss
├ variable　サイト全体で使える変数
  ├ variable.scss
├ mixin　サイト全体で使えるmixnを管理
Layout　各ページを構成するサイト全体で共通したエリアを管理。
├ l-header.scss
├ l-main.scss
├ l-footer.scss
Object　サイト全体で再利用できるパターンを持つモジュールを管理
├ Component　小さな単位のモジュールを管理（ボタンなど）
　├ c-button.scss
　├ c-grid.scss
　├ …
├ block　いくつかの↑Componentと、他の要素によって構成される大きな単位のモジュールを管理
　├ b-card.scss
　├ b-profile.scss
　├ ...
├ Utility ComponentとProjectのモディファイア（パターン）で解決することができないスタイル、また、調整のための便利クラスなどを管理。
　├ u-utility.scss
　├ u-color.scss
　├ u-margin.scss
　├ u-padding.scss
├ Theme テーマによる色の切り替えなど、ページ単位の色違いとか
　├ t-blue.scss
　├ ...


```

## install

```
$ npm init

// error autoprefixer -> autoprefixer@9.8.6
// npm local install  

$ npm i -D @babel/core @babel/preset-env @babel/preset-env browser-sync css-mqpacker gulp gulp-babel gulp-clean-css gulp-imagemin gulp-notify gulp-plumber gulp-postcss gulp-rename gulp-sass gulp-sourcemaps gulp-uglify imagemin-mozjpeg imagemin-pngquant imagemin-svgo postcss-flexbugs-fixes del autoprefixer@9.8.6
```
## start gulp

```
$ npx gulp
```



