import GulpPug from "gulp-pug";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";
import htmlmin from "gulp-html-minifier";
import rename from "gulp-rename";

export const html = () => {
  return app.gulp
    .src(app.path.src.html)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "HTML",
          message: "Error <%= error.message %>",
        })
      )
    )
    .pipe(GulpPug({ pretty: true }))
    .pipe(app.plugins.replace(/@img\//g, "images/"))
    .pipe(webpHtmlNosvg())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(
      versionNumber({
        value: "%DT%",
        append: {
          key: "_v",
          cover: 0,
          to: ["css", "js"],
        },
        output: {
          file: "gulp/version.json",
        },
      })
    )
    .pipe(app.plugins.browsersync.stream());
};
