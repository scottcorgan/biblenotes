'use strict';

angular.module('biblenotesApp')
  .controller('LoginCtrl', function ($scope, $location, User, $timeout) {
    $scope.loggingIn = false;
    $scope.submitValue = "Sign In";
    
    $scope.authorize = function () {
      $scope.loggingIn = true;
      $scope.submitValue = "Signing In";
      
      User.setNextRedirectTo('/notes');
      User.login($scope.username, $scope.password, true);
    };
    
    
    
  });
