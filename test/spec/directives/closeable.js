'use strict';

describe('Directive: closeable', function () {
  beforeEach(module('biblenotesApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<closeable></closeable>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the closeable directive');
  }));
});
