'use strict';

angular.module('biblenotesApp')
  .directive('focus', function () {
    return {
      restrict: 'A',
      scope: {
        focus: '&'
      },
      link: function postLink(scope, element, attrs) {
        element.on('focus', function () {
          scope.focus();
        });
      }
    };
  });
