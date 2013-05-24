'use strict';

angular.module('biblenotesApp').provider('User', function () {
  return {
    $get: function ($rootScope, $q, $location, angularFire, FIREBASE_BASE_URL, safeApply) {
      var defaultUserRef = new Firebase(FIREBASE_BASE_URL);
      var authClient;
      var nextRedirectTo = '/';
      var previousRedirectTo;
      var scope = $rootScope.$new();
      
      // // Track our user authentication
      // $rootScope.$on('$routeChangeStart', function () {
      //   if(!User.current){
      //     return $location.path('/login')
      //   }
      // });
      
      var User = {
        current: undefined,
        
        on: function (evt, cb) {
          scope.$on(evt, cb);
        },
        
        authorize: function () {
          authClient = new FirebaseAuthClient(defaultUserRef, function(err, user) {
            if(err || !user){
              if(err) {
                // alert('Invalid login credentials.');
                console.log("Invalid login credentials");
              }
              
              safeApply(scope, function () {
                User.current = undefined;
                $location.path('/login');
              });
              
              return scope.$broadcast('invalidLogin');
            }
            
            previousRedirectTo = nextRedirectTo;
            nextRedirectTo = '/';
            safeApply(scope, function () {
              User.current = user;
              scope.$broadcast('authorized');
              $location.path(previousRedirectTo);
            });
          });
        },
        
        setNextRedirectTo: function (redirectTo) {
          nextRedirectTo = redirectTo;
        },
        
        login: function (username, password, rememberMe) {
          scope.$broadcast('authorizing');
          
          authClient.login('password', {
            email: username,
            password: password,
            rememberMe: rememberMe
          });
        },
        
        logout: function () {
          var self = this;
          
          safeApply(scope, function () {
            User.current = undefined;
            authClient.logout();
          });
        },
        
        create: function (username, password) {
          var deferred = $q.defer();
          return deferred.promise;
        }
      };
      
      //
      return User;
    }
  }
});
