'use strict';

describe('Directive: blur', function () {
  beforeEach(module('biblenotesApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<blur></blur>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the blur directive');
  }));
});
