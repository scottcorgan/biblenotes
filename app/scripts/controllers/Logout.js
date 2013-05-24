'use strict';

angular.module('biblenotesApp')
  .controller('LogoutCtrl', function ($scope, User, $location, safeApply) {
    safeApply($scope, function () {
      User.logout();
      return $location.path('/login');
    });
  });
