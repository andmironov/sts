var gulp = require('gulp')
var gutil = require('gulp-util')
var source = require('vinyl-source-stream')
var babelify = require('babelify')
var watchify = require('watchify')
var exorcist = require('exorcist')
var browserify = require('browserify')
var browserSync = require('browser-sync').create()
var sass = require('gulp-sass')
var imagemin = require('gulp-imagemin')
var gutil = require('gulp-util');


var config = {
    paths: {
        src: {
            html: './src/*.html',
            scss: './src/scss/*.scss',
            js: './src/js/main.js',
            img: './src/img/**/*',
        },
        dist: './dist'
    }
}

// Watchify args contains necessary cache options to achieve fast incremental bundles.
// See watchify readme for details. Adding debug true for source-map generation.
watchify.args.debug = true
// Input file.
var bundler = watchify(browserify(config.paths.src.js, watchify.args))

// Babel transform
bundler.transform(
    babelify.configure({
        sourceMapRelative: './src/js'
    })
)

// On updates recompile
bundler.on('update', bundle)

function bundle() {
    gutil.log('Compiling JS...')

    return bundler
        .bundle()
        .on('error', function(err) {
            gutil.log(err.message)
            browserSync.notify('Browserify Error!')
            this.emit('end')
        })
        .pipe(exorcist('./dist/js/bundle.js.map'))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.stream({ once: true }))
}

gulp.task('bundle', function() {
    return bundle()
})


gulp.task('sass', function() {
    return gulp.src("./src/scss/main.scss")
        .pipe(sass())
        .on('error', gutil.log)
        .pipe(gulp.dest(config.paths.dist + '/css'))
        .pipe(browserSync.stream())
})


gulp.task('html', function() {
    gulp.src(config.paths.src.html)
        .pipe(gulp.dest(config.paths.dist))
})

gulp.task('imagemin', function() {
  gulp.src('./src/img/**/*')
      .pipe(imagemin())
      .pipe(gulp.dest('./dist/img'))
})


/**
 * First bundle, then serve from the ./app directory
 */
gulp.task('default', ['html', 'sass', 'bundle', 'imagemin'], function() {
    browserSync.init({
        server: config.paths.dist,
        notify: false
    })

    gulp.watch(config.paths.src.scss, ['sass'])
    gulp.watch(config.paths.src.img, ['imagemin'])
    gulp.watch(config.paths.src.html, ['html']).on('change',browserSync.reload)
})
