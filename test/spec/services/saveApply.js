'use strict';

describe('Service: saveApply', function () {

  // load the service's module
  beforeEach(module('biblenotesApp'));

  // instantiate service
  var saveApply;
  beforeEach(inject(function (_saveApply_) {
    saveApply = _saveApply_;
  }));

  it('should do something', function () {
    expect(!!saveApply).toBe(true);
  });

});
