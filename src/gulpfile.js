const { src, dest, task, series } = require("gulp");
const rm = require('gulp-rm');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

task( 'clean', () => {
    return src( '../dist/**/*', { read: false })
      .pipe( rm() )
  })

 task( 'copy', () => {
    return src('css/**/*.scss').pipe(dest('../dist'));
 })

 const styles = [
    'node_modules/normalize.css/normalize.css',
    'css/layout/main.scss'
   ];

 task('styles', () => {
    return src(styles)
      .pipe(sass().on('error', sass.logError))
      .pipe(dest('../dist'));
  });

 task('default', series('clean', 'styles'))
