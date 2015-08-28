'use strict';

var few = require('front-end-work-flow/gulp-tasks/setup.js');
var gulp = require('gulp');
var fs = require('fs');
var R = require('ramda');

// Add defaults
few.defaults.eslintrc = '.eslintrc';
few.defaults.eslint = {
  rules: {}
};

// Replace jscs and jshint with eslint
Object.keys(few.aggTaskDefinitions).forEach(function(key) {
  few.aggTaskDefinitions[key].dependencies =
    replaceWithEsLint(few.aggTaskDefinitions[key].dependencies);

  (few.aggTaskDefinitions[key].watches || []).forEach(function(watch) {
    watch.tasks = replaceWithEsLint(watch.tasks);
  });
});

// Create the gulp task
gulp.task('eslint', function() {
  var eslint = require('gulp-eslint');
  var config = getConfig();
  var files = few.files( 'browser' )
        .concat( few.files( 'node' ) )
        .concat( few.exclude( 'libraries' ) )
        .concat( few.exclude( 'devLibraries' ) );

  return gulp.src(files)
    .pipe(eslint(config))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

function getConfig() {
  var
    customRcPath = process.cwd() + '/' + few.config( 'eslintrc' ),

   fileRC =  !fs.existsSync( customRcPath ) ?
      {} : JSON.parse( fs.readFileSync( customRcPath ) ),
   manualRC = few.config( 'eslint' );

  return R.reduce( R.merge, {}, [ fileRC, manualRC ] );
}

function isWanted(x) {
  return x !== 'js-styles' && x !== 'lint-node' && x !== 'lint-browser';
}

function hasJscsOrJsHint(arr) {
  arr = arr || [];
  return arr.indexOf('js-styles') !== -1 || arr.indexOf('lint-browser') !== -1 || arr.indexOf('lint-node') !== -1;
}

function replaceWithEsLint(arr) {
  arr = arr || [];
  if(hasJscsOrJsHint(arr)) {
    arr = arr.filter(isWanted)
    arr.push('eslint');
  }
  return arr;
}

