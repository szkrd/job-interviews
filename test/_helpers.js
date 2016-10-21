global.expect = require('chai').expect;
global.sinon = require('sinon');
global.prequire = require('proxyquire');

// we can use async-await if we want to, but I should change
// "jshint" to "eslint" first, so that the linter wouldn't crap itself
require('babel/register')({optional: ["es7.asyncFunctions"]});