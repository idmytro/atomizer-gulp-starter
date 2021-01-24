const gulp = require("gulp");
const gulpAtomizer = require("gulp-atomizer");
const browserSync = require("browser-sync").create();

const watchRequire = require("watch-require");
const util = require("util");
const path = require("path");

const config = watchRequire(path.resolve("./build-utils/acss/config.js"));
const rules = watchRequire(path.resolve("./build-utils/acss/rules.js"));

const atomizerOptions = () => {
  return {
    outfile: "atomic.css",
    acssConfig: Object.assign({}, config.exports),
    addRules: rules.exports
  };
};

gulp.task("acss", () => {
  return gulp
    .src(["*.html"])
    .pipe(gulpAtomizer(atomizerOptions()))
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

    gulp.watch(
      ["*.html", "./build-utils/acss/*.js"],
      gulp.series("acss", "reload")
    );
  })
);

gulp.task("default", gulp.series("bs"));
