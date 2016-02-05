
var concat = require('gulp-concat');

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var sass = require('gulp-sass');

var path = {
  MINIFIED_OUT: 'chat.min.js',
  OUT: 'chat.js',
  DEST: 'dist',
  DEST_BUILD: 'assets/javascripts',
  DEST_SRC: 'dist/src',
  ENTRY_POINT: './src/javascripts/main.js'
};





gulp.task('js', function() {
  gulp.src('src/javascripts/app.js')
    .pipe(react())
    .pipe(concat('chat.js'))
    .pipe(uglify('chat.js'))
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

gulp.task('default', ['build', 'css']);

gulp.task('watch', function(){
  gulp.watch('src/**/*.*', ['default']);
});



gulp.task('build', function(){
  browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify]
  })
    .bundle()
    .pipe(source(path.OUT))
    .pipe(streamify(path.OUT))
    //.pipe(streamify(uglify(path.MINIFIED_OUT)))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('default', ['watch']);

gulp.task('production', ['build']);
