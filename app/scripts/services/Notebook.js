'use strict';

angular.module('biblenotesApp')
  .factory('Notebook', function ($rootScope, User, FIREBASE_BASE_URL, safeApply, angularFire, angularFireCollection) {
    var scope = $rootScope.$new();
    var user = User.current;
    var promise;
   
    //
    User.on('authorized', function () {
      user = User.current;
      
      if (user) {
        scope.notebooks = angularFireCollection(FIREBASE_BASE_URL + '/notebooks/' + user.id);
      }
    });
    
    scope.all = function () {
      return scope.notebooks;
    };
    
    scope.create = function (data, callback) {
      var name = scope.notebooks.add({
        title: data.title,
        owner: user.id,
        created: new Date(),
        modified: new Date()
      }, function (err) {
        if(err) {
          return alert('Error:', err);
        }
        
        safeApply(scope, function () {
          callback(scope.notebooks[scope.notebooks.length-1]);
        });
      });
    };
    
    scope.findById = function (id) {
      return _.find(scope.notebooks, function (notebook) {
        console.log(notebook.$id, id);
        return notebook.$id === id;
      });
    }
    
    scope.current = {}
    
    //
    return scope;
  });
