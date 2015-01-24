var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');

// npm bundle packing
var browserify = require('gulp-browserify');


// start express static file server
var express = require('express');
var app = express();
app.use(require('connect-livereload')());
app.use(express.static(__dirname + '/dist'));
app.listen(4000);

// start livereload server
var livereload = require('gulp-livereload');

function dest() {
	return gulp.dest('./dist/');
}

console.log("Live-reload server started at http://localhost:4000");

gulp.task('html', function() {
  return gulp.src('src/index.html')
      .pipe(dest())
      .pipe(livereload());
});

gulp.task('scripts', function() {
    return gulp.src('src/js/index.js')
        .pipe(browserify())
        .pipe(concat('bundle.js'))
        .pipe(dest())
        .pipe(livereload());
});

gulp.task('style', function() {
    gulp.src('./src/css/**')
        .pipe(concat('style.css'))
        .pipe(dest())
        .pipe(livereload());
});

gulp.task('default', function(){

    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('src/css/**/*.css', ['style']);
    gulp.watch('src/*.html', ['html']);

    livereload.listen();
});