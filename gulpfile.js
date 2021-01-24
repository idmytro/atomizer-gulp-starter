const gulp = require("gulp");
const gulpAtomizer = require("gulp-atomizer");
const browserSync = require("browser-sync").create();

gulp.task("acss", () => {
  return gulp
    .src("*.html")
    .pipe(
      gulpAtomizer({
        outfile: "atomic.css",
        acssConfig: Object.assign({}, require("./build-utils/acss/config")),
        addRules: require("./build-utils/acss/rules")
      })
    )
    .pipe(gulp.dest("dist"));
});

gulp.task("html-watch", done => {
  browserSync.reload();
  done();
});

gulp.task(
  "bs",
  gulp.series("acss", () => {
    browserSync.init({
      server: {
        baseDir: "./"
      }
    });

    gulp.watch(["*.html"], gulp.parallel("acss", "html-watch"));
  })
);

gulp.task("default", gulp.series("bs"));
