'use strict';

let gulp = require('gulp');
let config = require('./gulp.config.js');
let historyApi = require('connect-history-api-fallback');
let gzip = require('compression');
let options = config.browserSyncOptions;

gulp.task('browser-sync', browserSyncTask);

function browserSyncTask() {
  options.middleware = [
    historyApi(),
    gzip(),
  ],
  config.browserSync.init(options);
}
