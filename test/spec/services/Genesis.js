'use strict';

describe('Service: genesis', function () {

  // load the service's module
  beforeEach(module('biblenotesApp'));

  // instantiate service
  var genesis;
  beforeEach(inject(function (_genesis_) {
    genesis = _genesis_;
  }));

  it('should do something', function () {
    expect(!!genesis).toBe(true);
  });

});
