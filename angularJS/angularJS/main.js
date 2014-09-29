angular.module('sibbApp', ["ngRoute", "ui.bootstrap"])
    .config(function ($routeProvider, $locationProvider) {
      //$locationProvider.hashPrefix('!');

      $routeProvider.when('/list', {
        templateUrl: '/views/listView.html',
        controller: 'PersonListCtrl',
        controllerAs: 'listCtrl'
      });

      // Edit person
      $routeProvider.when('/detail/:personId', {
        templateUrl: '/views/detailView.html',
        controller: 'PersonDetailCtrl',
        controllerAs: 'detailCtrl'
      });

      // Create person
      $routeProvider.when('/detail', {
        templateUrl: '/views/detailView.html',
        controller: 'PersonDetailCtrl',
        controllerAs: 'detailCtrl'
      });

      $routeProvider.otherwise({ redirectTo: '/list' });
    })