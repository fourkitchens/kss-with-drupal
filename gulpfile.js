/* globals require, process, __dirname */

(function () {

  'use strict';

  var gulp = require('gulp-npm-run')(require('gulp-help')(require('gulp')));
  var _ = require('lodash');
  var browserSync = require('browser-sync').create();
  var config = require('./gulp-config');
  var execSync = require('sync-exec');
  var eyeglass = require('eyeglass');
  var glob = require('glob');
  var prefix = require('gulp-autoprefixer');
  var runSequence = require('run-sequence');
  var sass = require('gulp-sass');
  var sassGlob = require('gulp-sass-glob');
  var sassLint = require('gulp-sass-lint');
  var localConfig = {};

  try {
    localConfig = require('./local.gulp-config');
  }
  catch (e) {
    config = _.defaultsDeep(localConfig, config);
  }

  /**
   * SASS Task
   */
  gulp.task('css', function () {
    return gulp.src(config.paths.sass + '/**/*.scss')
      .pipe(sassGlob())
      .pipe(sassLint())
      .pipe(sassLint.format())
      .pipe(sassLint.failOnError())
      .pipe(sass(eyeglass(config.sassOptions)).on('error', sass.logError))
      .pipe(prefix(['last 1 version', '> 1%', 'ie 10']))
      .pipe(gulp.dest('themes/custom/kss/dist/css'))
  });

  /**
   * SASS Task
   */
  gulp.task('styleguide-css', ['css'], function () {
    return gulp.src(config.paths.sass + '/**/*.scss')
      .pipe(sassGlob())
      .pipe(sassLint())
      .pipe(sassLint.format())
      .pipe(sassLint.failOnError())
      .pipe(sass(eyeglass(config.sassOptions)).on('error', sass.logError))
      .pipe(prefix(['last 1 version', '> 1%', 'ie 10']))
      .pipe(gulp.dest('themes/custom/kss/styleguide/css'))
  });

  /**
   * Task for creating CSS and Style Guide
   */
  gulp.task('styles', function() {
    runSequence(['styleguide-css'], 'kss');
  });

  /**
   * Task for running browserSync.
   */
  gulp.task('serve', ['styles'], function() {
    browserSync.init({
      server: './themes/custom/kss/styleguide'
    })
    gulp.watch(config.paths.sass + '/**/*.scss', ['styles']).on('change', browserSync.reload)
  });
})();
