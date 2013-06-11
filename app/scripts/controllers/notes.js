'use strict';

angular.module('biblenotesApp')
  .controller('NotesCtrl', function ($scope, User, Notebook, Note) {
    $scope.currentNote = null;
    $scope.newNote = {};
    $scope.orderBy = 'created';
    $scope.activeIndex = 0;
    $scope.activeNotebookIdx;
    $scope.user = null;
    $scope.Notebook = Notebook;
    $scope.Note = Note;
    $scope.orderNotebooksBy = 'title';
    
    //////////////// Notebooks //////////////////
    User.setNextRedirectTo('/notes');
    User.on('authorized', function () {
      $scope.user = User.current;
    });
    
    $scope.$watch(function () { return $scope.Notebook.all() }, function (notebook) {
      if(notebook && $scope.user) {
        // $scope.Notebook.current = $scope.Notebook.findById('-IvOG9vJ3_dxRPmiibDK');
      }
    });
    
    $scope.setCurrentNotebook = function (notebook, idx) {
      $scope.activeNotebookIdx = idx;
      $scope.closeNotebookList();
      $scope.Notebook.current = notebook;
    };
    
    $scope.createNewList = function () {
      $scope.Notebook.create({
        title: $scope.newListTitle
      }, function (notebook) {
        $scope.Notebook.current = notebook;
        $scope.closeNotebookList();
        $scope.newListTitle = null;
      });
    };
    
    $scope.closeNotebookList = function () {
      $scope.showNotebookList = false;
    }
    
    
    
    ////////////// Notes //////////////////////
    $scope.loadNote = function (note) {
      if (!note){
        note = $scope.notes[$scope.notes.length-1];
      }
      
      $scope.Note.current = note;
      // $scope.currentNote = note;
    };
    
    $scope.isActiveNote = function (note) {
      if(note === $scope.Note.current){
        return 'active';
      }
    };
    
    $scope.composeNewNote = function () {
      var note = $scope.Note.create({
        title: '',
        content: '',
      });
      // $scope.loadNote();
    };
    
    $scope.removeNote = function (note) {
      if(!confirm('Are you sure you want to delete this note?')){
        return false;
      }
      
      var idx = $scope.notes.indexOf(note);
      $scope.notes.splice(idx, 1);
      $scope.Note.current = null;
    };
    
    $scope.textEditorChange = function (content, obj) {
      // This is where we will do the scripture detection
    };
    
    
    $scope.focusTitle = function () {
      $scope.titleFocus = !$scope.titleFocus
    }
  });
