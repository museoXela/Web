var gulp = require('gulp'),
    uglify      = require('gulp-uglify'),
    changed     = require('gulp-changed'),
    minifyHTML  = require('gulp-minify-html'),
    browserify = require('browserify'),
    source = require("vinyl-source-stream"),
    watchify = require('watchify'),
    stylus = require('gulp-stylus'),
    nib = require('nib'),
    util = require('gulp-util');

function browserifyShare(){
  // you need to pass these three config option to browserify
  var filename = (util.env.filename ? util.env.filename : 'index');
  var b = browserify({
    cache: {},
    packageCache: {},
    fullPaths: true
  });
  b = watchify(b);
  b.on('update', function(){
    bundleShare(b);
  });
  
  b.add('./desarrollo/static/js/main-'+ filename +'.js');
  bundleShare(b);
}

function bundleShare(b) {
  var filename = (util.env.filename ? util.env.filename : 'index');
  b.bundle()
    .pipe(source('main-'+ filename +'.js'))
    .pipe(gulp.dest('./sitioWeb/app/static/js'));
}

gulp.task('html', function () {
  var htmlSrc = './desarrollo/templates/*.html',
      htmlDst = './sitioWeb/app/templates';

  gulp.src(htmlSrc)
  .pipe(minifyHTML())
  .pipe(gulp.dest(htmlDst));
});

gulp.task('partials', function (){
  var htmlSrc = './desarrollo/static/partials/*.html',
      htmlDst = './sitioWeb/app/templates/partials';

  gulp.src(htmlSrc)
  .pipe(minifyHTML())
  .pipe(gulp.dest(htmlDst));
});

gulp.task('stylus', function () {
  var filename = (util.env.filename ? util.env.filename : 'index');
  var cssSrc = './desarrollo/static/stylus/main-'+ filename +'.styl',
      cssDst = './sitioWeb/app/static/css';

  gulp.src(cssSrc)
    .pipe(stylus({
      use: nib(),
      compress: true
    }))
    .pipe(gulp.dest(cssDst));
});

gulp.task('browserify', function(){
  browserifyShare();
});
gulp.task('js', function () {
  gulp.src('desarrollo/static/js/main.js')
    .pipe(uglify({ compress: true }))
    .pipe(gulp.dest('sitioWeb/app/static/js'));
});


gulp.task('toDjango', ['html', 'stylus', 'partials'], function (){
  gulp.watch("desarrollo/templates/*.html", ['html']);
  gulp.watch("desarrollo/static/partials/*.html", ['partials']);
  gulp.watch("desarrollo/static/stylus/*.styl", ['stylus']);
});