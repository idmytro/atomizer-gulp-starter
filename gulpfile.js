const gulp = require("gulp");
const gulpAtomizer = require("gulp-atomizer");
const browserSync = require("browser-sync").create();

const paths = {
  outfile: "atomic.css",
  src: ["*.html"],
  dest: "dist",
  watch: ["*.html", "./build-utils/acss/*.js"]
};

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

gulp.task("bs-init", done => {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  done();
});

gulp.task("bs-reload", done => {
  browserSync.reload();
  done();
});

gulp.task(
  "bs",
  gulp.series("acss", "bs-init", () => {
    gulp.watch(paths.watch, gulp.series("acss", "bs-reload"));
  })
);

gulp.task("default", gulp.series("bs"));
