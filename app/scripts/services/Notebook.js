'use strict';

angular.module('biblenotesApp')
  .factory('Notebook', function ($rootScope, User, FIREBASE_BASE_URL, safeApply, angularFire) {
    var scope = $rootScope.$new();
    var user = User.current;
    var promise;
   
    //
    User.on('authorized', function () {
      user = User.current;
      
      if (user) {
        promise = angularFire(FIREBASE_BASE_URL + '/notebooks/' + user.id, scope, 'notebooks', []);
      }
    });
    
    scope.all = function () {
      return scope.notebooks;
    };
    
    scope.create = function (data) {
      var notebookId = scope.notebooks.push({
        title: data.title,
        created: new Date(),
        modified: new Date()
      });
      
      return this.findById(notebookId);
    };
    
    scope.findById = function (id) {
      return scope.notebooks[id-1];
    }
    
    scope.current = {}
    
    //
    return scope;
  });
