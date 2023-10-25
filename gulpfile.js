const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const webp = require('gulp-webp');
const nunjucksRender = require('gulp-nunjucks-render');
const uglify = require('gulp-uglify-es').default
const autoprefixer = require('gulp-autoprefixer')
const scss = require('gulp-sass')(require('sass'))
const browserSync = require('browser-sync').create()
const data = require('gulp-data');

const src = {
  js: 'src/js/*/*.js',
  css: 'src/scss/*.scss',
  fonts: 'src/fonts/*.woff2',
  images: 'src/img/*.{jpg,png,svg}',
  templates: 'src/*.njk',

};

const dest = {
  js: 'dist/js',
  css: 'dist/css',
  fonts: 'dist/fonts',
  images: 'dist/img',
  html: 'dist',
};

gulp.task('js', function () {
  return gulp.src(src.js)
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dest.js))
    .pipe(browserSync.stream())
});

gulp.task('css', function () {
  return gulp.src(src.css)
    .pipe(autoprefixer({overrideBrowserslist: ['last 10 version']}))
    .pipe(scss({ outputStyle:'compressed' }).on('error', scss.logError))
    .pipe(concat('styles.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(dest.css))
    .pipe(browserSync.stream())
});

gulp.task('fonts', function () {
  return gulp.src(src.fonts)
    .pipe(gulp.dest(dest.fonts))
    .pipe(browserSync.stream());
});

gulp.task('webp', function () {
  return gulp.src(src.images)
    .pipe(webp({ quality: 100 }))
    .pipe(gulp.dest(dest.images))
    .pipe(browserSync.stream())
});

gulp.task('nunjucks', function () {
  return gulp.src(src.templates)
    .pipe(data(function() {
      const data = require('./src/templates/data/data.json')
      return {data}
    }))
    .pipe(nunjucksRender({
      path: ['src/templates/']
    }))
    .pipe(gulp.dest(dest.html))
    .pipe(browserSync.stream())
});

gulp.task('watch', function () {
  gulp.watch(src.js, gulp.series('js'));
  gulp.watch(src.css, gulp.series('css'));
  gulp.watch(src.images, gulp.series('webp'));
  gulp.watch('src/**/*.njk', gulp.series('nunjucks')).on('change', browserSync.reload);
  gulp.watch('dist/*.html').on('change', browserSync.reload)
});



gulp.task('browsersync', function() {
  browserSync.init({
    server: {
        baseDir: "./dist"
    }
  });
})


gulp.task('default', gulp.parallel('js', 'css', 'fonts', 'webp', 'nunjucks', 'browsersync', 'watch'));
