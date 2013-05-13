'use strict';

angular.module('biblenotesApp')
  .controller('NotesCtrl', function ($scope, angularFire) {
    var url = 'https://biblenotes.firebaseio.com/scottcorgan/notes';
    var notes = $scope.notes = angularFire(url, $scope, 'notes');
    var $noteTaker = $('#note-taker');
    
    notes.then(function () {
      $scope.loadNote();
    });
    
    $scope.currentNote = null;
    $scope.newNote = {};
    $scope.orderBy = 'created';
    $scope.loadNote = function (note) {
      if (!note){
        note = $scope.notes[$scope.notes.length-1];
      }
      
      $scope.currentNote = note;
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
        title: 'New Note',
        content: ''
      });
      
      // $('.note-title').focus();
      $scope.loadNote();
    };
    $scope.removeNote = function (note) {
      if(!confirm('Are you sure you want to delete this note?')){
        return false;
      }
      
      var idx = $scope.notes.indexOf(note);
      $scope.notes.splice(idx, 1);
      $scope.currentNote = null;
    };
    $scope.saveFromEditor = function (content) {
      $scope.currentNote.content = content;
    }
    
  });
