'use strict';

angular.module('biblenotesApp')
  .controller('LoginCtrl', function ($scope, $rootScope, $location, User, safeApply) {
    $scope.submitValue = "Sign In";
    
    $scope.authorize = function () {
      $scope.invalid = false;
      
      User.setNextRedirectTo('/');
      User.login($scope.username, $scope.password, true);
    };
    
    // User listeners
    User.on('invalidLogin', function () {
      $scope.invalid = true;
      resetForm();
    });
    User.on('authorized', function () {
      $scope.invalid = false;
      resetForm();
    });
    User.on('authorizing', function () {
      $scope.submitValue = "Signing In";
      $scope.loggingIn = true;
    });
    
    // Helpers
    function resetForm () {
      safeApply($scope, function () {
        $scope.submitValue = "Sign In";
        $scope.loggingIn = false;
      });
    }
    
  });
