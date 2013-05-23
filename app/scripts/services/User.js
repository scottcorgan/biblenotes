'use strict';
// .factory('User', function ($rootScope, $q, angularFire, FIREBASE_BASE_URL, safeApply) {
angular.module('biblenotesApp').provider('User', function (FIREBASE_BASE_URL) {
  
  var defaultUserRef = new Firebase(FIREBASE_BASE_URL);
  var authClient;
  var nextRedirectTo = '/';
  var previousRedirectTo;
  var _user;
  
  //
  var authorize = function () {
    authClient = new FirebaseAuthClient(defaultUserRef, function(err, user) {
      if(err || !user){
        
        if(err) {
          alert('Invalid login credentials.');
        }
        
        return window.location.hash = '/login';
      }
      
      _user = user;
      previousRedirectTo = nextRedirectTo;
      nextRedirectTo = '/';
      window.location.hash = previousRedirectTo;
    });
  };
  
  return {
    authorize: authorize,
    current: _user,
    
    $get: function ($rootScope, $q, angularFire, FIREBASE_BASE_URL, safeApply) {
      return {
        current: _user,
        
        setNextRedirectTo: function (redirectTo) {
          nextRedirectTo = redirectTo;
        },
        
        login: function (username, password, rememberMe) {
          authClient.login('password', {
            email: username,
            password: password,
            rememberMe: rememberMe
          });
        },
        
        logout: function () {
          authClient.logout();
        },
        
        create: function (username, password) {
          var deferred = $q.defer();
          return deferred.promise;
        }
      };
    }
  }
});
