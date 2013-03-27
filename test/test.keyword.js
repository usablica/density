//Prepare test
require('./../density');
var assert = require('assert');

describe('density', function () {
  it('should split the keywords', function (done) {
    assert.equal(JSON.stringify(density("Hello World").getDensity()), JSON.stringify(
    [{
        word: "world",
        count: 1
     },
     {
        word: "hello",
        count: 1
     }
    ]));
    done();
  });
  it('should count the keywords', function (done) {
    assert.equal(JSON.stringify(density("Hello Hello all").getDensity()), JSON.stringify(
    [{
        word: "hello",
        count: 2
     },
     {
        word: "all",
        count: 1
     }
    ]));
    done();
  });
});