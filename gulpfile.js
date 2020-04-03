const { src, dest, task, series, watch } = require("gulp");
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

task( 'clean', () => {
    return src(`${DIST_PATH}/**/*`, { read: false }) 
      .pipe( rm() )
})

task('copy:html', () => {
  return src(`${SRC_PATH}/*.html`)
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
 })

task('styles', () => {
    return src([...STYLE_LIBS, 'src/css/layout/main.scss'])
      .pipe(sourcemaps.init())
      .pipe(concat('main.min.scss'))
      .pipe(sassGlob())
      .pipe(sass().on('error', sass.logError))
      .pipe(px2rem())
      .pipe(autoprefixer({
        cascade: true
      }))
      // .pipe(gcmq())
      .pipe(cleanCSS())
      .pipe(sourcemaps.write())
      .pipe(dest(DIST_PATH))
      .pipe(reload({ stream: true }));
});

const libs = [
  'node_modules/jquery/dist/jquery.js',
  'src/scripts/*.js'
 ];

task('scripts', () => {
  return src([...JS_LIBS, 'src/scripts/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js', {newLine: ';'}))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(dest('DIST_PATH'))
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

watch('src/*.html', series('copy:html'));
watch('src/css/**/*.scss', series('styles'));
watch('src/scripts/*.js', series('scripts'));

task('default', series('clean', 'copy:html', 'styles', 'scripts', 'server'));
