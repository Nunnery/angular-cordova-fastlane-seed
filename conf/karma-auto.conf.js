'use strict';

const conf = require('./gulp.conf');
const listFiles = require('./karma-files.conf');
const karmaConf = require('./karma.conf');
const _ = require('lodash');

module.exports = function (config) {
  const configuration = _.merge({}, karmaConf, {
    singleRun: false,
    autoWatch: true
  });

  config.set(configuration);
};
