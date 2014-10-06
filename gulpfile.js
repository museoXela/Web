var gulp = require('gulp'),
    uglify      = require('gulp-uglify'),
    changed     = require('gulp-changed'),
    minifyHTML  = require('gulp-minify-html'),
    browserify = require('browserify'),
    source = require("vinyl-source-stream"),
    watchify = require('watchify'),
    stylus = require('gulp-stylus'),
    nib = require('nib');

function browserifyShare(){
  // you need to pass these three config option to browserify
  var b = browserify({
    cache: {},
    packageCache: {},
    fullPaths: true
  });
  b = watchify(b);
  b.on('update', function(){
    bundleShare(b);
  });
  
  b.add('./static/js/prueba.js');
  bundleShare(b);
}

function bundleShare(b) {
  b.bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./static/js'));
}

gulp.task('html', function () {
  var htmlSrc = './desarrollo/templates/*.html',
      htmlDst = './sitioWeb/app/templates';

  gulp.src(htmlSrc)
  .pipe(minifyHTML())
  .pipe(gulp.dest(htmlDst));
});

gulp.task('stylus', function () {
  var cssSrc = './desarrollo/static/stylus/*.styl',
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


gulp.task('toDjango', ['html', 'stylus'], function (){
  gulp.watch("desarrollo/templates/*.html", ['html']);
  gulp.watch("desarrollo/static/stylus/*.styl", ['stylus']);
});