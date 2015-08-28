ESLint for FEW
==============

> An eslint plugin for `front-end-work-flow`

For an introduction to few see
[front-end-work-flow](https://github.com/taylor1791/front-end-work-flow).
This replaces all instances of `jscs` and `jshint` with `eslint` in all
workflows. `jscs` and `jshint` still exist and can be run manually by using
`gulp lint-browser`.

Installation
------------

    $ npm install few-eslint --save-dev

Example gulpfile.js
-------
```
// Configure plugins
require('few-eslint');

var few = require('front-end-work-flow/gulpfile.js');

// Configure ESLint
few.eslint = {
  rules: {
    strict: [2, 'global']
  }
};


few.files.node = ['gulpfile.js'];
```

Options
-------
`few.eslintrc` - '.eslintrc' - This is the name of eslint config file. 
`few` will read this file and use it as a base for your `eslint` rules.
`few.eslint` - `{ rules: {} }` - This is a json object that will define your 
eslint rules.

To see how to configure `eslint`, see the `eslint` 
[user-guide](http://eslint.org/docs/user-guide/configuring).

