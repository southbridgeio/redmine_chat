var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

gulp.task('js', function() {
  gulp.src('src/javascripts/*.js')
    .pipe(uglify())
    .pipe(concat('chat.js'))
    .pipe(gulp.dest('assets/javascripts'))
    .pipe(gulp.dest('../../public/plugin_assets/redmine_chat/javascripts'));
});

gulp.task('css', function () {
  gulp.src('src/stylesheets/**/*.+(scss|css)')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('chat.css'))
    .pipe(gulp.dest('assets/stylesheets'))
    .pipe(gulp.dest('../../public/plugin_assets/redmine_chat/stylesheets'));
});

gulp.task('watch', function () {
  gulp.watch('src/javascripts/*.js', ['js']);
  gulp.watch('src/stylesheets/**/*.+(scss|css)', ['css']);
});
