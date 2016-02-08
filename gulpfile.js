'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

var del = require('del');

var path = {
    build: {
        html: 'assets/',
        js: 'assets/javascripts/',
        css: 'assets/stylesheets/',
        img: 'assets/images/',
        fonts: 'assets/fonts/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/javascripts/main.js',
        style: 'src/stylesheets/main.scss',
        img: 'src/images/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/javascripts/**/*.js',
        style: 'src/stylesheets/**/*.scss',
        img: 'src/images/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './assets'
};


gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('css:build', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['src/stylesheets/'],
            outputStyle: 'compressed',
            sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(gulp.dest('../../public/plugin_assets/redmine_chat/stylesheets'));
});

// Load plugins
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream'),

    sourceFile = './src/javascripts/app.js',

    destFolder = './assets/javascripts',
    destFileName = 'app.js';

var browserSync = require('browser-sync');
var reload = browserSync.reload;



var bundler = watchify(browserify({
    entries: [sourceFile],
    debug: true,
    insertGlobals: true,
    cache: {},
    packageCache: {},
    fullPaths: true
}));

bundler.on('update', rebundle);
bundler.on('log', $.util.log);

function rebundle() {
    return bundler.bundle()
        // log errors if they happen
        .on('error', $.util.log.bind($.util, 'Browserify Error'))
        .pipe(source(destFileName))
        .pipe(gulp.dest(destFolder))
        .pipe(gulp.dest('../../public/plugin_assets/redmine_chat/javascripts'));;
}

// Scripts
gulp.task('scripts', rebundle);

gulp.task('buildScripts', function() {
    return browserify(sourceFile)
        .bundle()
        .pipe(source(destFileName))
        .pipe(gulp.dest('assets/javascripts'))
        .pipe(gulp.dest('../../public/plugin_assets/redmine_chat/javascripts'));
});


// Watch
gulp.task('watch', function() {
  gulp.watch(['src/stylesheets/**/*.scss'], ['css:build']);
  gulp.watch(['src/javascripts/**/*.js'], ['scripts']);
});

// Build
gulp.task('build', ['buildBundle'], function() {
    gulp.src('dist/scripts/app.js')
        .pipe($.uglify())
        .pipe($.stripDebug())
        .pipe(gulp.dest('dist/scripts'));
});

// Default task
gulp.task('default', ['clean', 'build'  ]);
