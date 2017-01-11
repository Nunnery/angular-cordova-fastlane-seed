'use strict';

/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

const path = require('path');
const gutil = require('gulp-util');
const _ = require('lodash');

const environments = Object.keys(require('./environments.json'));
const brands = Object.keys(require('./brands.json'));

exports.ngModule = 'app';

/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
  src: 'src',
  dist: 'dist',
  tmp: '.tmp',
  e2e: 'e2e',
  tasks: 'gulp_tasks',
  cordova: 'cordova',
  templates: 'templates'
};

exports.path = {};
for (const pathName in exports.paths) {
  if (exports.paths.hasOwnProperty(pathName)) {
    exports.path[pathName] = function pathJoin() {
      const pathValue = exports.paths[pathName];
      const funcArgs = Array.prototype.slice.call(arguments);
      const joinArgs = [pathValue].concat(funcArgs);
      return path.join.apply(this, joinArgs);
    };
  }
}

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function (title) {
  return function (err) {
    gutil.log(gutil.colors.red(`[${title}]`), err.toString());
    this.emit('end');
  };
};

/**
 *  Wiredep is the lib which inject bower dependencies in your project
 *  Mainly used to inject script tags in the index.html but also used
 *  to inject css preprocessor deps and js files in karma
 */
exports.wiredep = {
  exclude: [/\/bootstrap\.js$/, /\/bootstrap-sass\/.*\.js/, /\/bootstrap\.css/],
  directory: 'bower_components'
};

/**
 * Parses the command string given to Gulp to find which environment is being built for.
 *
 * Reads from the --env command flag.
 *
 * @return {string}
 */
exports.environment = function() {
  let env = gutil.env.env || environments[0];
  return _.includes(environments, env) ? env : environments[0];
};

/**
 * Parses the command string given to Gulp to find which brand is being built for.
 *
 * Reads from the --brand command flag.
 *
 * @return {string}
 */
exports.brand = function() {
  let brand = gutil.env.brand || brands[0];
  return _.includes(brands, brand) ? brand : brands[0];
};

/**
 * Parses the command string given to Gulp to find which feature is being built for.
 *
 * Reads from the --feature command flag.
 *
 * @return {string}
 */
exports.feature = function() {
  return gutil.env.feature || '';
};
