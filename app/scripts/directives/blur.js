'use strict';

angular.module('biblenotesApp')
  .directive('blur', function () {
    return {
      restrict: 'A',
      scope: {
        blur: '='
      },
      link: function postLink(scope, element, attrs) {
        element.on('blur', function () {
          scope.blur()
        });
      }
    };
  });
