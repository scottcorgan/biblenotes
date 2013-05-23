'use strict';

angular.module('biblenotesApp')
  .factory('auth', function (angularFire, $location) {
    var ref;
    var authClient;
    var url = 'https://biblenotes.firebaseio.com/notes';
    var loggedIn = false;
    
    ref = new Firebase(url);
    authClient = new FirebaseAuthClient(ref, function(error, user) {
      if(!error && user) {
        loggedIn = true;
      }
      else{
        $location.path('/login');
      }
    });
    
    var connect = function (callback) {
      if (loggedIn) {
        callback(user)
      }
      else{
        $location.path('/login');
      }
    };
    
    return {
      connection: ref,
      client: authClient,
      connect: connect
    };
  });
