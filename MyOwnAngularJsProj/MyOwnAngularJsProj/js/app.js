(function () {
  'use strict';

  var angular = window.angular;

  var dotaApp = angular.module('dotaApp', [
    'ngRoute',
    'dotaControllers'
  ]);

  dotaApp.config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider.
        when('/heroes', {
          templateUrl: 'views/heroes.html',
          controller: 'heroesCtrl'
        }).
        when('/matches', {
          templateUrl: 'views/matches.html',
          controller: 'matchesCtrl'
        }).
        when('/main', {
          templateUrl: 'views/main.html',
          controller: 'mainCtrl'
        }).
        when('/items', {
          templateUrl: 'views/items.html',
          controller: 'itemsCtrl'
        }).
        when('/heroes/:heroName', {
          templateUrl: 'views/heroDetail.html',
          controller: 'heroDetailCtrl'
        }).
        otherwise({
          redirectTo: '/main'
        });
    }]);
})();