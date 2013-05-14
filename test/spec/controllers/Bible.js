'use strict';

describe('Controller: BibleCtrl', function () {

  // load the controller's module
  beforeEach(module('biblenotesApp'));

  var BibleCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BibleCtrl = $controller('BibleCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
