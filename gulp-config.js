/* globals module */

(function () {
  'use strict';

  var themeDir = 'themes/custom/kss';
  var paths = {
    js: themeDir + '/js',
    sass: themeDir + '/sass',
    img: themeDir + '/img',
    dist_js: themeDir + '/dist/js',
    dist_css: themeDir + '/dist/css',
    dist_img: themeDir + '/dist/img'
  };

  module.exports = {
    host: 'http://kss.local',
    themeDir: themeDir,
    paths: paths,
    sassOptions: {
      outputStyle: 'expanded',
      eyeglass: {
        enableImportOnce: false
      },
      drupalSassBreakpoints: {
        themePath: 'themes/custom/kss/'
      }
    }
  };
})();

