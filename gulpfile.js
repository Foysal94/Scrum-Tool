/// <binding Clean='clean' />
"use strict";

var gulp = require("gulp"),
  rimraf = require("rimraf"),
  concat = require("gulp-concat"),
  cssmin = require("gulp-cssmin"),
  uglify = require("gulp-uglify"),
  project = require("./project.json");

var paths = ***REMOVED***
  webroot: "./wwwroot/"
***REMOVED***;

paths.js = paths.webroot + "js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";

gulp.task("clean:js", function(cb) ***REMOVED***
  rimraf(paths.concatJsDest, cb);
***REMOVED***);

gulp.task("clean:css", function(cb) ***REMOVED***
  rimraf(paths.concatCssDest, cb);
***REMOVED***);

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", function() ***REMOVED***
  gulp.src([paths.js, "!" + paths.minJs], ***REMOVED***
      base: "."
***REMOVED***)
    .pipe(concat(paths.concatJsDest))
    .pipe(uglify())
    .pipe(gulp.dest("."));
***REMOVED***);

gulp.task("min:css", function() ***REMOVED***
  gulp.src([paths.css, "!" + paths.minCss])
    .pipe(concat(paths.concatCssDest))
    .pipe(cssmin())
    .pipe(gulp.dest("."));
***REMOVED***);

gulp.task("min", ["min:js", "min:css"]);
