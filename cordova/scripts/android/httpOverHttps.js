'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function(context) {
  var gradleFile = path.join(context.opts.projectRoot, '/platforms/android/build.gradle');
  if (fs.existsSync(gradleFile)) {
    var data = fs.readFileSync(gradleFile, 'utf-8');
    var replacedData = data.replace('jcenter()', 'maven { url "http://jcenter.bintray.com" }')
      .replace('mavenCentral()', 'maven { url "https://slamrepo.wellpoint.com/artifactory/public" }');
    fs.writeFileSync(gradleFile, replacedData, 'utf-8');
  }
};
