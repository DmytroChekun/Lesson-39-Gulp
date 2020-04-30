let gulp = require('gulp'),
sass = require('gulp-sass'),
browserSync = require('browser-sync'),
uncss = require('gulp-uncss-task'),
csso = require('gulp-csso');
gulp.task('autoprefixer', () => {
    const autoprefixer = require('autoprefixer')
    const sourcemaps = require('gulp-sourcemaps')
    const postcss = require('gulp-postcss')
  
    return gulp.src('app/css/*.css')
      .pipe(sourcemaps.init())
      .pipe(postcss([ autoprefixer() ]))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('app/css/'))
  })

gulp.task('scss', function(){
    return gulp.src('app/scss/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});
gulp.task('default', function() {
    gulp.src('bootstrap.css')
        .pipe(uncss({
            html: ['index.html', '*.html']
        }))
        .pipe(gulp.dest('dest'));
});

// csso                      ==========================
gulp.task('default', function () {
    return gulp.src('app/css/style.css')
        .pipe(csso())
        .pipe(gulp.dest('dest/css/style.css'));
});
 
gulp.task('development', function () {
    return gulp.src('app/css/style.css')
        .pipe(csso({
            restructure: false,
            sourceMap: true,
            debug: true
        }))
        .pipe(gulp.dest('dest/css/style.css'));
});

gulp.task('watch', function(){
    gulp.watch('app/scss/**/*.scss', gulp.parallel('default', 'scss', 'autoprefixer', 'development'))
});
