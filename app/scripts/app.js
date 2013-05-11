'use strict';

angular.module('biblenotesApp', ['firebase'])
  .config(function ($routeProvider, $locationProvider) {
    // $locationProvider.html5Mode(true);
    
    $routeProvider
      .when('/notes', {
        templateUrl: 'views/main.html',
        controller: 'NotesCtrl'
      })
      .when('/bible', {
        tempalteUrl: 'views/bible.html'
      })
      .otherwise({
        redirectTo: '/notes'
      });
  });
