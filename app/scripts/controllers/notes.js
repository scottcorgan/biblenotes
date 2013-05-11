'use strict';

angular.module('biblenotesApp')
  .controller('NotesCtrl', function ($scope, angularFire) {
    // TODO: Need to turn this into a directive
     var editor = new wysihtml5.Editor("note-taker", { // id of textarea element
       // toolbar:      "note-taker-toolbar", // id of toolbar element
       composerClassName: 'note-taker-composer',
       parserRules:  wysihtml5ParserRules // defined in parser rules set 
     });
    
    //
    
    
    var url = 'https://biblenotes.firebaseio.com/scottcorgan/notes';
    var notes = $scope.notes = angularFire(url, $scope, 'notes');
    
    notes.then(function () {
      $scope.loadNote();
      
      var save = function () {
        $scope.$apply(function () {
          var text = editor.getValue();
          $scope.currentNote.content = text;
          console.log('saved');
        });
      }
      
      // Save on blur and new word
      // TODO: save ever second as well if not already saved
      editor.on('newword:composer', save);
      editor.on('change:composer', save);
    });
    
    $scope.currentNote = {};
    $scope.newNote = {};
    $scope.orderBy = 'created';
    $scope.loadNote = function (note) {
      if (!note){
        note = $scope.notes[$scope.notes.length-1];
      }
      
      $scope.currentNote = note;
      editor.setValue(note.content);
    };
    $scope.isActiveNote = function (note) {
      if(note === $scope.currentNote){
        return 'active';
      }
    };
    $scope.composeNewNote = function () {
      $scope.notes.push({
        created: new Date(),
        modified: new Date(),
        title: '',
        content: ''
      });
      
      $('.note-title').focus();
      $scope.currentNote = $scope.notes[$scope.notes.length-1];
      // $scope.loadNote();
    };
    
  });
