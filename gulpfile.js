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
var refresh = require('gulp-livereload');
var server = require('tiny-lr')();
server.listen(35729, function(err) {
	if(err) return console.log(err);
});

function dest() {
	return gulp.dest('./dist/');
}


console.log("Live-reload server started at http://localhost:4000");

gulp.task('default', function(){
  gulp.src('./src/index.html')
    .pipe(dest())
	.pipe(refresh(server));

  gulp.src('./src/js/index.js')
    .pipe(browserify())
    .pipe(concat('bundle.js'))
    .pipe(dest())
	.pipe(refresh(server));

  gulp.src('./src/css/**')
    .pipe(concat('style.css'))
    .pipe(dest())
	.pipe(refresh(server));
});

gulp.watch('src/**', function(){
  gulp.run('default');
});
