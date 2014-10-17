(function () {
  'use strict';

  var angular = window.angular;

  var dotaApp = angular.module('dotaApp', [
    'ngRoute',
    'dotaControllers',
    'ui.bootstrap'
  ]);

  dotaApp.config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider.
        when('/heroes', {
          templateUrl: 'views/heroes.html'
        }).
        when('/matches', {
          templateUrl: 'views/matches.html',
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
          templateUrl: 'views/heroDetail.html'
        }).
        otherwise({
          redirectTo: '/main'
        });
    }]);
})();