const gulp = require("gulp");
const gulpAtomizer = require("gulp-atomizer");
const browserSync = require("browser-sync").create();

const watchRequire = require("watch-require");
const util = require("util");
const path = require("path");

const paths = {
  outfile: "atomic.css",
  src: ["*.html"],
  dest: "dist",
  watch: ["*.html", "./build-utils/acss/*.js"]
};

const config = watchRequire(path.resolve("./build-utils/acss/config.js"));
const rules = watchRequire(path.resolve("./build-utils/acss/rules.js"));

const atomizerOptions = () => {
  return {
    outfile: paths.outfile,
    acssConfig: Object.assign({}, config.exports),
    addRules: rules.exports
  };
};

gulp.task("acss", () => {
  return gulp
    .src(paths.src)
    .pipe(gulpAtomizer(atomizerOptions()))
    .pipe(gulp.dest(paths.dest));
});

gulp.task("bs-init", done => {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  done();
});

gulp.task("reload", done => {
  browserSync.reload();
  done();
});

gulp.task(
  "bs",
  gulp.series("acss", "bs-init", () => {
    gulp.watch(paths.watch, gulp.series("acss", "reload"));
  })
);

gulp.task(
  "watch",
  gulp.series("acss", () => {
    gulp.watch(paths.watch, gulp.series("acss"));
  })
);

gulp.task("default", gulp.series("bs"));
