process.env.NODE_ENV = 'test';

const path = require('path');

const gulp = require('gulp');
const karma = require('karma');

gulp.task('karma:single-run', karmaSingleRun);
gulp.task('karma:auto-run', karmaAutoRun);

function karmaFinishHandler(done) {
  return failCount => {
    done(failCount ? new Error(`Failed ${failCount} tests.`) : null);
  };
}

function karmaRun(done, auto) {
  const configFile = path.join(process.cwd(), 'conf', auto ? 'karma-auto.conf.js' : 'karma.conf.js');
  const karmaServer = new karma.Server({configFile}, karmaFinishHandler(done));
  karmaServer.start();
}

function karmaSingleRun(done) {
  karmaRun(done, false);
}

function karmaAutoRun(done) {
  karmaRun(done, true);
}
