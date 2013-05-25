'use strict';

angular.module('biblenotesApp')
  .factory('Note', function ($q, $rootScope, User, FIREBASE_BASE_URL, safeApply, angularFire, Notebook) {
    var scope = $rootScope.$new();
    var user = User.current;
    var promise;
    
    scope.$watch(function () { return Notebook.current }, function (current) {
      var notebooks = Notebook.all();
      
      if (notebooks) {
        scope.currentNotebookIdx = notebooks.indexOf(Notebook.current);
        
        if (scope[scope.currentNotebookIdx]) {
          return;
        }
        scope[scope.currentNotebookIdx] = scope[scope.currentNotebookIdx] ||$rootScope.$new();
        scope[scope.currentNotebookIdx].promise = angularFire(FIREBASE_BASE_URL + '/notes/' + user.id + '/' + scope.currentNotebookIdx, scope[scope.currentNotebookIdx], 'notes', []);
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
      scope[scope.currentNotebookIdx] = scope[scope.currentNotebookIdx] || $rootScope.$new();
      return scope[scope.currentNotebookIdx].notes;
    };
    
    scope.create = function (data) {
      var noteId = scope[scope.currentNotebookIdx].notes.push({
        title: data.title,
        content: data.content,
        created: new Date(),
        modified: new Date()
      });
      
      return this.findById(noteId);
    };
    
    scope.findById = function (id) {
      return scope[scope.currentNotebookIdx].notes[id-1];
    }
    
    scope.current = {}
    
    //
    return scope;
  });
