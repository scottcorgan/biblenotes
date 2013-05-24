'use strict';

angular.module('biblenotesApp')
  .controller('NotesCtrl', function ($scope, FIREBASE_BASE_URL, angularFire, $timeout, $location, $rootScope, User, Notebook) {
    var notes;
    var url = FIREBASE_BASE_URL + '/notes';
    var ref = new Firebase(url);
    
    $scope.currentNote = null;
    $scope.newNote = {};
    $scope.orderBy = 'created';
    $scope.activeIndex = 0;
    $scope.user = null;
    $scope.Notebook = Notebook;
    $scope.orderNotebooksBy = 'title';
    
    //
    User.setNextRedirectTo('/notes');
    User.on('authorized', function () {
      $scope.user = User.current;
    });
    
    $scope.setCurrentNotebook = function (notebook) {
      $scope.closeNotebookList();
      $scope.currentNotebook = notebook;
    };
    
    $scope.createNewList = function () {
      Notebook.create({ title: $scope.newListTitle }, function (status, data) {
        if (status == 'error') {
          return console.log('Error:', err);
        }
        
        $scope.currentNotebook = Notebook.findById(data);
      });
      
      $scope.closeNotebookList();
      $scope.newListTitle = null;
    };
    
    $scope.closeNotebookList = function () {
      $scope.showNotebookList = false;
    }
    
    //
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
      var idx = $scope.notes.push({
        created: new Date(),
        modified: new Date(),
        title: '',
        content: '',
      });
      
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
    
    $scope.textEditorChange = function (content, obj) {
      // This is where we will do the scripture detection
    };
  });
