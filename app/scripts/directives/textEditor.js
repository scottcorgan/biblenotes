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
        var save = _.throttle(function (obj, evt) {
          console.log('saved');
          scope.$apply(function () {
            applied = true;
            scope.model = element.getCode();
            
            // Reset the applied flag
            $timeout(function () {
              applied = false;
            }, 0);
          });
        }, 1000);
        
        element.redactor({
          // source: false,
          focus: false,
          tabindex: 2,
          autoresize: false,
          buttons: ['formatting', '|', 'bold', 'italic', 'deleted', '|', 'alignment', '|',
                    'unorderedlist', 'orderedlist', 'outdent', 'indent', '|',
                    'image', 'video', 'file', 'table', 'link', '|',
                    'fontcolor', 'backcolor', 'horizontalrule', 'html', ],
          execCommandCallback: function (obj, evt) {
            save(obj, evt);
          },
          keyupCallback: function (obj, evt) {
            save(obj, evt);
          }
        });
        
        scope.$watch('model', function (content) {
          // We don't want to update if there is not content
          // or of the content was just applied
          if (content === null || applied) {
            return;
          }
          
          element.setCode(content);
        });
      }
    };
  });
