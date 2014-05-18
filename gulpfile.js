var gulp = require('gulp'),
  gutil = require('gulp-util');

// global error handler
function onError(err) {
  gutil.beep();
  gutil.log(err);
  this.emit('end'); // prevent error from killing watch
}

gulp.task('default', ['browserify']);

var browserify = require('browserify'),
    source = require('vinyl-source-stream');
gulp.task('browserify', function () {
  return browserify(['./src/index.js'])
    .bundle({debug: true})
    .on('error', onError)
    .pipe(source('index.js'))
    .pipe(gulp.dest('./www'));
});

gulp.task('watch', function () {
  gulp.watch('./src/*.js', ['browserify']);
});