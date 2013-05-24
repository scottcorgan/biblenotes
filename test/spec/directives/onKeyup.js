'use strict';

describe('Directive: onKeyup', function () {
  beforeEach(module('biblenotesApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<on-keyup></on-keyup>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the onKeyup directive');
  }));
});
