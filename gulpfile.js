const gulp = require("gulp");
const gulpAtomizer = require("gulp-atomizer");
const browserSync = require("browser-sync").create();

gulp.task("acss", () => {
  return gulp
    .src(["*.html"])
    .pipe(
      gulpAtomizer({
        outfile: "atomic.css",
        acssConfig: Object.assign({}, require("./build-utils/acss/config")),
        addRules: require("./build-utils/acss/rules")
      })
    )
    .pipe(gulp.dest("dist"));
});

gulp.task("reload", done => {
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

    gulp.watch(["*.html"], gulp.series("acss", "reload"));
  })
);

gulp.task("default", gulp.series("bs"));
