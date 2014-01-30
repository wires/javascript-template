
// to demonstrate that you can load modules
var _ = require('lodash');
var Foo = require('./my-module');

Foo(document.getElementById('content'), 'hello, world!');
