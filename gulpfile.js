var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    livereload = require('gulp-livereload');
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer');

gulp.task('sass', () => {
  gulp.src('./sass/**/*.scss')
    .pipe(sass())
    .pipe(cssmin())
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

gulp.task('js', () => {
  return browserify()
    .transform("babelify", {
      presets: ["latest", "react"],
        "plugins": [
          ["transform-class-properties"]
        ]
    })
    .add('./scripts/app.js')
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    // .pipe(uglify())
    .pipe(gulp.dest("./public/scripts"))
    .pipe(livereload());
});

gulp.task('watch', () => {
  gulp.watch('./sass/**/*.scss', ['sass']);
  gulp.watch("./scripts/**/*.*", ['js']);
  livereload.listen();
});

gulp.task('release', ['sass', 'js']);
gulp.task('default', ['watch', 'sass', 'js']);
