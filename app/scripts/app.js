'use strict';

angular.module('biblenotesApp', ['firebase'])
  .controller('AppCtrl', function ($rootScope, $scope, $location, User) {
    User.authorize();
    $scope.location = $location;
  });  