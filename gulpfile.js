const gulp = require('gulp');
const gulpAtomizer = require('gulp-atomizer');
const gulpHtmlMin = require('gulp-html-minifier');
const browserSync = require('browser-sync').create();

gulp.task('bs', ['html', 'acss'], () => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });

  gulp.watch(["src/*.html"], ['html', 'acss']);
});

gulp.task('html', function() {
  return gulp.src(['src/*.html'])
    .pipe(gulpHtmlMin({
      collapseInlineTagWhitespace: true,
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('acss', () => {
  return gulp.src('src/*.html')
    .pipe(gulpAtomizer({
      outfile: 'atomic.css',
      addRules: require('atomizer-emmet-compat')
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('rebuild', ['html', 'acss']);

gulp.task('default', ['rebuild', 'bs']);
