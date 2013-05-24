'use strict';

angular.module('biblenotesApp')
  .directive('onKeyup', function () {
    return function(scope, elm, attrs) {
        elm.bind("keyup", function(e) {
          scope.$apply(attrs.onKeyup);
        });
      };
  });
