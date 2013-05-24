'use strict';

angular.module('biblenotesApp')
  .factory('Notebook', function ($rootScope, User, FIREBASE_BASE_URL, safeApply, angularFire) {
    var scope = $rootScope.$new();
    var notebookref;
    var user = User.current;
    var userNotebooksRef;
    var notebooksRef
    var promise;
   
    //
    User.on('authorized', function () {
      user = User.current;
      
      if (user) {
        notebooksRef = new Firebase(FIREBASE_BASE_URL + '/notebooks');
        userNotebooksRef = new Firebase(FIREBASE_BASE_URL + '/users/' + user.id + '/notebooks');
        
        promise = angularFire(FIREBASE_BASE_URL + '/notebooks/' + user.id, scope, 'notebooks', []);
        
        // Set up
        // userNotebooksRef.on('child_added', function (snapshot) {
        //   var notebookRef = notebooksRef.child(snapshot.name());
        //   notebookRef.on('value', function (notebook) {
        //     // console.log(notebook.name(), notebook.val());
        //     safeApply(scope, function () {
        //       var _notebookObj = notebook.val();
        //       _notebookObj._id = notebook.name();
        //       Notebook._all.push(_notebookObj);
        //     });
        //   })
        // });
      }
    });
    
    scope.all = function () {
      return scope.notebooks;
    };
    
    scope.create = function (data, callback) {
      promise.then(function () {
        scope.notebooks.push({
          title: data.title,
          notes: {}
        });
      });
    };
    
    //
    var Notebook = {
      _all: [],
      
      all: function () {
        // return this._all;
        return scope.notebooks;
      },
      
      create: function (data, callback) {
        // if (!user || !userNotebooksRef || !notebooksRef) {
        //   return callback('NO_CONNECTION');
        // }
        
        promise.then(function () {
          scope.notebooks.push({
            title: data.title,
            notes: {}
          });
        });
        
        // var notebook = notebooksRef.push();
        // notebook.set({
        //   title: data.title,
        //   owner: user.id,
        //   notes: {}
        // }, function (err) {
        //   if (err) {
        //     return callback('error', err);
        //   }
          
        //   userNotebooksRef.child(notebook.name()).set(true);
        //   callback('success', notebook.name());
        // });
      }
      
      // findById: function (id) {
      //   return _.find(this._all, function (notebook) {
      //     notebook._id === id;
      //   });
      // }
    };
    
    //
    // return Notebook;
    return scope;
  });
