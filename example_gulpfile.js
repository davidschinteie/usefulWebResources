var     gulp            = require('gulp'),
        log             = require('fancy-log'),
        color           = require('ansi-colors'),
        sass            = require('gulp-sass'),
        cssnano         = require('gulp-cssnano'),
        autoprefixer    = require('gulp-autoprefixer'),
        sourcemaps      = require('gulp-sourcemaps'),
        rename          = require('gulp-rename'),
        plumber         = require('gulp-plumber'),
        browserSync     = require('browser-sync').create(),
        sassFiles       = 'css/**/*.scss',
        cssDest         = 'css/';

// Browser-Sync watch files and inject changes
gulp.task('browserSync', function() {
    
    // Watch files
    var files = [
    	'css/*.css',
    	'js/*.js',
    	'**/*.php',
    	'img/**/*.{png,jpg,gif,svg,webp}'
    ];
    
    browserSync.init(files, {
        //server: true - option for simple server
        proxy: "http://localhost/website-folder" //option for xamp local server 
    })
})

// Compile Sass, Autoprefix and minify
gulp.task('styles', function(){
    return gulp.src(sassFiles)
        .pipe(plumber(function(error){
            log(color.red(error.message));
            this.emit('end');
        }))
        .pipe(sourcemaps.init()) // Start Sourcemaps
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(cssDest))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssnano())
        .pipe(sourcemaps.write('.')) // Creates sourcemaps for minified styles
        .pipe(gulp.dest(cssDest))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('default', ['styles','browserSync'], function(){
    gulp.watch(sassFiles, ['styles']);
});
