'use strict';

angular.module('biblenotesApp')
  .directive('textEditor', function () {
    return {
      restrict: 'A',
      scope:{
        editorContent: '=textEditor',
        hideWidth: '=',
        save: '&'
      },
      link: function postLink(scope, element, attrs) {
        element.redactor({
          toolbar: false,
          source: false,
          focus: false,
          tabindex: 2,
          keyupCallback: _.throttle(function (obj, evt) {
            scope.save({content: element.getCode()});
          }, 1000)
        });
        
        scope.$watch('editorContent', function (content) {
          content = content || '';
          element.setCode(content);
        });
        
        scope.$watch('hideWidth', function (val) {
          var $el = $('.redactor_box');
          
          if (val) {
            return $el.show();
          }
          
          $el.hide();
        });
      }
    };
  });
