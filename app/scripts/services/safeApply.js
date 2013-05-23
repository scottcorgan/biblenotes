'use strict';

angular.module('biblenotesApp')
  .factory('safeApply', function () {
    return function (scope, fn) {
      var phase = scope.$root.$$phase;
       if(phase == '$apply' || phase == '$digest') {
         if(fn && (typeof(fn) === 'function')) {
           fn();
         }
       } else {
         scope.$apply(fn);
       }
    }
  });
