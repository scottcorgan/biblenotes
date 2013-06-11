'use strict';

angular.module('biblenotesApp')
  .factory('Note', function ($q, $rootScope, User, FIREBASE_BASE_URL, safeApply, angularFire, Notebook) {
    var scope = $rootScope.$new();
    var user = User.current;
    var promise;
    
    scope.$watch(function () { return Notebook.current }, function (current) {
      var notebooks = Notebook.all();
      
      if (notebooks) {
        scope.currentNotebookId = Notebook.current.$id;
        scope.current = null;
        
        // Need to set the current notebook on the user
        
        if (scope[scope.currentNotebookId]) {
          return;
        }
        scope[scope.currentNotebookId] = scope[scope.currentNotebookId] || $rootScope.$new();
        scope[scope.currentNotebookId].promise = angularFire(FIREBASE_BASE_URL + '/notes/' + user.id + '/' + scope.currentNotebookId, scope[scope.currentNotebookId], 'notes', []);
      }
    });
    
    //
    User.on('authorized', function () {
      user = User.current;
      
      if (user) {
        // scope.promise = angularFire(FIREBASE_BASE_URL + '/notes/' + user.id, scope, 'notes', []);
      }
    });
    
    scope.all = function () {
      scope[scope.currentNotebookId] = scope[scope.currentNotebookId] || $rootScope.$new();
      return scope[scope.currentNotebookId].notes;
    };
    
    scope.create = function (data) {
      var noteId = scope[scope.currentNotebookId].notes.push({
        title: data.title,
        content: data.content,
        created: new Date(),
        modified: new Date()
      });
      
      return this.findById(noteId);
    };
    
    scope.findById = function (id) {
      return scope[scope.currentNotebookId].notes[id-1];
    }
    
    scope.current = null
    
    //
    return scope;
  });
