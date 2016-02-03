var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

gulp.task('js', function() {
  gulp.src('src/javascripts/*.js')
    .pipe(uglify())
    .pipe(concat('chat.js'))
    .pipe(gulp.dest('assets/javascripts'));
});

gulp.task('css', function () {
  gulp.src('src/stylesheets/**/*.+(scss|css)')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('chat.css'))
    .pipe(gulp.dest('assets/stylesheets'));
});
