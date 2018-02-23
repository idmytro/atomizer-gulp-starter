const gulp = require('gulp');
const gulpAtomizer = require('gulp-atomizer');
const browserSync = require('browser-sync').create();

gulp.task('acss', () => {
  return gulp.src('*.html')
    .pipe(gulpAtomizer({
      outfile: 'atomic.css',
      acssConfig: Object.assign({}, require('./acssConfig')),
      addRules: require('./acssRules')
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('bs', gulp.series('acss', () => {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch(["*.html"], gulp.parallel(['acss', 'html-watch']));
}));

gulp.task('html-watch', gulp.series(done => {
  browserSync.reload();
  done();
}));

gulp.task('default', gulp.series('bs'));
