'use strict';

angular.module('biblenotesApp', ['firebase'])
  .controller('AppCtrl', function ($scope, $location) {
    $scope.location = $location;
  });  