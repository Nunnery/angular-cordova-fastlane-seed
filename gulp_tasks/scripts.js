const path = require('path');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const ngConfig = require('gulp-ng-config');
const merge = require('merge-stream');
const preprocess = require('gulp-preprocess');

const conf = require('../conf/gulp.conf');

gulp.task('scripts:lint', scriptsLint);
gulp.task('scripts:process', scriptsProcess);

gulp.task('scripts:generate:config', scriptsGenerateConfig);
gulp.task('scripts:generate', gulp.parallel('scripts:generate:config'));

gulp.task('scripts', gulp.parallel('scripts:lint', 'scripts:process', 'scripts:generate'));

function scriptsLint() {
  return gulp.src(conf.path.src('**/*.js'))
    .pipe(eslint())
    .pipe(eslint.format());
}

function scriptsProcess() {
  return gulp.src(conf.path.src('**/*.js'))
    .pipe(preprocess())
    .pipe(gulp.dest(conf.path.tmp()));
}

function scriptsGenerateConfig() {
  const brandConfig = gulp.src('./conf/brands.json')
    .pipe(ngConfig('app.config.brand', {environment: conf.brand()}))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/app/config')));
  const environmentConfig = gulp.src('./conf/environments.json')
    .pipe(ngConfig('app.config.environment', {environment: conf.environment()}))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/app/config')));
  return merge(brandConfig, environmentConfig);
}
