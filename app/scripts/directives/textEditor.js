'use strict';

angular.module('biblenotesApp')
  .directive('textEditor', function ($timeout) {
    return {
      restrict: 'A',
      scope:{
        model: '=textEditor',
      },
      link: function postLink(scope, element, attrs) {
        var applied = false;
        
        element.redactor({
          toolbar: false,
          source: false,
          focus: false,
          tabindex: 2,
          keyupCallback: _.throttle(function (obj, evt) {
            scope.$apply(function () {
              applied = true;
              scope.model = element.getCode();
              
              // Reset the applied flag
              $timeout(function () {
                applied = false;
              }, 0);
            });
          }, 1000)
        });
        
        scope.$watch('model', function (content) {
          // We don't want to update if there is not content
          // or of the content was just applied
          if (!content || applied) {
            return;
          }
          
          element.setCode(content);
        });
      }
    };
  });
