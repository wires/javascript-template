var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');

// npm bundle packing
var browserify = require('gulp-browserify');

function dest() {
	return gulp.dest('./dist/');
}

gulp.task('default', function(){
  gulp.src('./src/index.html')
    .pipe(dest());

  gulp.src('./src/js/index.js')
    .pipe(browserify())
    .pipe(concat('bundle.js'))
    .pipe(dest());

  gulp.src('./src/css/**')
    .pipe(concat('style.css'))
    .pipe(dest());
});

gulp.watch('src/**', function(){
  gulp.run('default');
});
