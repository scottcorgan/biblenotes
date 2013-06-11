'use strict';

angular.module('biblenotesApp')
  .directive('textEditor', function ($timeout, safeApply) {
    return {
      restrict: 'A',
      scope:{
        model: '=textEditor',
        textEditorChange: '&'
      },
      link: function postLink(scope, element, attrs) {
        var applied = false;
        var save = function (content) {
          safeApply(scope, function () {
            applied = true;
            scope.model = content
            
            // Reset the applied flag
            $timeout(function () {
              applied = false;
            }, 0);
          });
        }
        
        element.redactor({
          // source: false,
          linebreaks: true,
          focus: false,
          tabindex: 2,
          autoresize: true,
          buttons: ['formatting', '|', 'bold', 'italic', 'deleted', '|', 'alignment', '|',
                    'unorderedlist', 'orderedlist', 'outdent', 'indent', '|',
                    'image', 'video', 'file', 'table', 'link', '|',
                    'fontcolor', 'backcolor', 'horizontalrule', '|'],
          changeCallback: function (content) {
            if (content) {
              scope.textEditorChange({content: content, obj: element});
              save(content);
            }
          }
        });
        
        scope.$watch('model', function (content) {
          // We don't want to update if there is not content
          // or of the content was just applied
          if (content === null || applied) {
            return;
          }
          
          element.redactor('set', content);
        });
      }
    };
  });
