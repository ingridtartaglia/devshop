var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var inject = require('gulp-inject');
var server = require('gulp-server-livereload');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var lib    = require('bower-files')();
var minifyCss = require('gulp-minify-css');
var useref = require('gulp-useref');
var gif = require('gulp-if');
/////////////////// BUILD SCRIPTS

gulp.task('build', function(){
    gulp.src('./bower_components/font-awesome/fonts/*')
        .pipe(gulp.dest('dist/fonts'));

    gulp.src('./views/*.html')
        .pipe(gulp.dest('dist/views'));

  return gulp.src('./index.html')
            .pipe(useref())
            .pipe(gif('*.js', uglify()))
            .pipe(gulp.dest('dist'));
});

/////////////////// DEV SCRIPTS
gulp.task('init', ['webserver', 'inject', 'sass:watch']);

gulp.task('webserver',function() {
  gulp.src('./')
    .pipe(server({
      livereload: true,
      directoryListing: false,
      open: true
  }));
});

gulp.task('inject', function(){
	gulp.src('./index.html')
	.pipe(wiredep())
	.pipe(inject(gulp.src(['./scripts/**/*.js', './css/**/*.css']), {relative: true}))
	.pipe(gulp.dest('./'));
});

gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});
