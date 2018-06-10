"use strict";

var path = {
  allPath: "./**/*.*",
  sourcePath: "./",
  buildPath: "./",
  cssPath: "/css",
  jsPath: "/js",
  imgPath: "/img",
};

/* Packages */

var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;

// Server
gulp.task("browser-sync", () => {
  browserSync.init({
    server: {
      baseDir: path.buildPath
    },
    notify: false,
    uf: false
  });

  browserSync.watch(path.buildPath + "**/*.*").on("change", reload);
});

// Start
gulp.task("bs", gulp.series("browser-sync"));
