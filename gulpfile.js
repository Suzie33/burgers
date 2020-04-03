const { src, dest, task, series, watch, parallel } = require("gulp");
const rm = require('gulp-rm');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const {SRC_PATH, DIST_PATH, STYLE_LIBS, JS_LIBS} = require('./gulp.config');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

task( 'clean', () => {
  console.log(env );
    return src(`${DIST_PATH}/**/*`, { read: false }) 
      .pipe( rm() )
})

task('copy:html', () => {
  return src(`${SRC_PATH}/*.html`)
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
})

task('copy:fonts', () => {
  return src(`${SRC_PATH}/fonts/*`)
    .pipe(dest(`${DIST_PATH}/fonts`))
    .pipe(reload({ stream: true }));
})

task('copy:images', () => {
  return src(`${SRC_PATH}/img/**/*`)
    .pipe(dest(`${DIST_PATH}/img`))
    .pipe(reload({ stream: true }));
})

task('styles', () => {
    return src([...STYLE_LIBS, 'src/css/layout/main.scss'])
      .pipe(gulpif(env === 'dev', sourcemaps.init()))
      .pipe(concat('main.min.scss'))
      .pipe(sassGlob())
      .pipe(sass().on('error', sass.logError))
      // .pipe(px2rem())
      .pipe(autoprefixer({
        cascade: true
      }))
      .pipe(gulpif(env === 'prod', gcmq()))
      .pipe(gulpif(env === 'prod', cleanCSS()))
      .pipe(gulpif(env === 'dev', sourcemaps.write()))
      .pipe(dest(DIST_PATH))
      .pipe(reload({ stream: true }));
});

task('scripts', () => {
  return src([...JS_LIBS, 'src/scripts/*.js'])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.js', {newLine: ';'}))
    .pipe(gulpif(env === 'prod', babel({
      presets: ['@babel/env']
    })))
    .pipe(gulpif(env === 'prod', uglify()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
 });

task('server', () => {
   browserSync.init({
      server: {
            baseDir: "./dist"
      },
      open: false
  });
 });

task('watch', () => {
  watch('src/*.html', series('copy:html'));
  watch('src/css/**/*.scss', series('styles'));
  watch('src/scripts/*.js', series('scripts'));
});

task('default', 
  series(
    'clean',
     parallel('copy:html', 'copy:fonts', 'copy:images', 'styles', 'scripts'),
     parallel('watch', 'server')
  )
);

task('build',
 series(
   'clean',
   parallel('copy:html', 'copy:fonts', 'copy:images', 'styles', 'scripts'))
);
