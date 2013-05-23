'use strict';

angular.module('biblenotesApp')
  .controller('LoginCtrl', function ($scope, $location, User) {
    
    User.authorize().then(function (user) {
      $location.path('/');
    })
    
    $scope.authorize = function () {
      User.login($scope.username, $scope.password, true);
      $location.path('/');
    };
    
  });
