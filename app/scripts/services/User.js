'use strict';

angular.module('biblenotesApp')
  .factory('User', function ($rootScope, $q, angularFire, FIREBASE_BASE_URL, safeApply) {
    
    //
    var defaultUserRef = new Firebase(FIREBASE_BASE_URL);
    var authClient = new FirebaseAuthClient(defaultUserRef, function(err, user) {
      //
    });
    
    //
    return {
      authorize: function (child) {
        var deferred = $q.defer();
        var ref = defaultUserRef
        
        // Child data
        if (child) {
          ref = new Firebase(FIREBASE_BASE_URL + '/' + child);
        }
        
        // Authorize
        authClient = new FirebaseAuthClient(ref, function(err, user) {
          var fn = deferred.resolve;
          var response = user;
          
          if(err || !user) {
            fn = deferred.reject;
            response = err || 'unauthorized';
          }
          
          // Good to go
          safeApply($rootScope, function () {
            fn(response);
          });
        });
        
        return deferred.promise;
      },
      
      login: function (username, password, rememberMe) {
        authClient.login('password', {
          email: username,
          password: password,
          rememberMe: rememberMe
        });
      },
      
      create: function (username, password) {
        var deferred = $q.defer();
        return deferred.promise;
      }
    };
  });
