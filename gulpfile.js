var gulp = require('gulp'),
    del = require('del'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    ngAnnotate = require('browserify-ngannotate'),
    plumber = require('gulp-plumber'),
    neat = require('node-neat').includePaths,
    browserSync = require('browser-sync').create();

var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();

/////////////////////////////////////////////////////////////////////////////////////
//
// error handling
//
/////////////////////////////////////////////////////////////////////////////////////
var gulp_src = gulp.src;
gulp.src = function() {
 return gulp_src.apply(gulp, arguments)
   .pipe(plumber(function(error) {
     // Output an error message
     gutil.log(gutil.colors.red('******** Error (' + error.plugin + '): ' + error.message));
     // emit the end event, to properly end the task
     this.emit('end');
   })
 );
};
/* -------- END Error Handling -------- */

/////////////////////////////////////////////////////////////////////////////////////
//
// cleans the build output
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('clean', function (cb) {
    del([
        'dist'
    ], cb);
});

/////////////////////////////////////////////////////////////////////////////////////
//
// runs bower to install frontend dependencies
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('bower', function() {

    var install = require("gulp-install");

    return gulp.src(['./bower.json'])
        .pipe(install());
});

/////////////////////////////////////////////////////////////////////////////////////
//
// runs sass, creates css source maps
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('build-css', function() {
    return gulp.src('./app/styles/*')
        .pipe(sourcemaps.init())
        .pipe(sass({
          includePaths: ['build-css'].concat(neat)
        }))
        .pipe(cachebust.resources())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist'));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// simple sass
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('sass', function(){
  return gulp.src('./app/styles/application.scss')
    .pipe(sass({
      includePaths: ['sass'].concat(neat)
    }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

/////////////////////////////////////////////////////////////////////////////////////
//
// fills in the Angular template cache, to prevent loading the html templates via
// separate http requests
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('build-template-cache', ['clean'], function() {

    var ngHtml2Js = require("gulp-ng-html2js"),
        concat = require("gulp-concat");

    return gulp.src("./app/states/*.html")
        .pipe(ngHtml2Js({
            prefix: "/states/"
        }))
        .pipe(concat("states.js"))
        .pipe(gulp.dest("./dist"));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// runs jshint
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('jshint', function() {
    gulp.src('/app/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// Build a minified Javascript bundle - the order of the js files is determined
// by browserify
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('build-js', function() {
    var b = browserify({
        entries: './app/app.js',
        debug: true,
        paths: ['./app/controllers/*.js', './app/services/*.js', './app/directives/*.js'],
        transform: [ngAnnotate]
    });

    return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(cachebust.resources())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js/'));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// full build applies cache busting to the main page css and js bundles
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('build', [ 'clean', 'bower','build-css','build-template-cache', 'jshint', 'build-js'], function() {
    return gulp.src('index.html')
        .pipe(cachebust.references())
        .pipe(gulp.dest('./dist'));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// watches file system and triggers a build when a modification is detected
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('watch', function() {
    return gulp.watch(['./index.html','./app/states/*.html', './app/styles/*.*css', './app/**/*.js'], ['build']);
});

/////////////////////////////////////////////////////////////////////////////////////
//
// launches a server that serves files in the current directory
//
/////////////////////////////////////////////////////////////////////////////////////

// Static server
gulp.task('serve',['sass'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("app/styles/*.*css", ['sass']);
    gulp.watch(["app/states/*.html", "./index.html"]).on('change', browserSync.reload);
    gulp.watch(['./app/controllers/*.js', './app/services/*.js', './app/directives/*.js']).on('change', browserSync.reload);
});

// Production server
gulp.task('dist-serve', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch("app/styles/*.*css", ['build-css']);
    gulp.watch(["app/states/*.html", "./index.html"]).on('change', browserSync.reload);
    gulp.watch(['./app/controllers/*.js', './app/services/*.js', './app/directives/*.js']).on('change', browserSync.reload);
});

/////////////////////////////////////////////////////////////////////////////////////
//
// launch a build upon modification and publish it to a running server
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('dev', ['watch', 'serve']);


/////////////////////////////////////////////////////////////////////////////////////
//
// installs and builds everything
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('default', ['build']);
