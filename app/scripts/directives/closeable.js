'use strict';

angular.module('biblenotesApp')
  .directive('closeable', function ($timeout) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        
        // scope.$watch('closeable', function (val) {
        //   if (!val) {
        //     return;
        //   }
          
        //   $timeout(function () {
        //     $('body').one('click', function () {
        //         $timeout(function () {
        //           scope.closeable = false;
        //         }, 10);
        //     });
        //   });
        // });
        
      }
    };
  });
