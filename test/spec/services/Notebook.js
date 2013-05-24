'use strict';

describe('Service: Notebook', function () {

  // load the service's module
  beforeEach(module('biblenotesApp'));

  // instantiate service
  var Notebook;
  beforeEach(inject(function (_Notebook_) {
    Notebook = _Notebook_;
  }));

  it('should do something', function () {
    expect(!!Notebook).toBe(true);
  });

});
