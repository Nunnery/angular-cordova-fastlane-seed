module.exports = {
  'env': {
    'browser': true,
    'es6': false,
    'jasmine': true
  },
  'extends': ['eslint:recommended', 'angular', 'google', 'plugin:jasmine/recommended'],
  'globals': {
    'cordova': false
  },
  'plugins': [
    'jasmine'
  ],
  'rules': {
    'indent': [
      2,
      2
    ],
    'linebreak-style': [
      0
    ],
    'max-len': [
      2,
      120
    ],
    'no-var': [
      0
    ]
  }
};
