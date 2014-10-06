(function () {
  'use strict';

  var angular = window.angular;

  var dotaControllers = angular.module('dotaControllers', []);

  dotaControllers.controller('heroesCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $http.get('data/heroes.json').then(function (result) {
      $scope.heroes = result.data.heroes;
    });
    $scope.goToHeroDetail = function (hero) {
      $location.path('heroes/' + hero.name);
    };
  }]);

  dotaControllers.controller('matchesCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V1?key=9F5ED90795E74A50AEE916A820A488F2').then(function (result) {
      $scope.matches = result.data.result.matches;
    });
  }]);

  dotaControllers.controller('mainCtrl', ['$scope', '$http', function ($scope, $http) {

  }]);

  dotaControllers.controller('itemsCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('data/items.json').then(function (result) {
      $scope.items = result.data.items;
    });
  }]);

  dotaControllers.controller('heroDetailCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    var heroName = $routeParams.heroName;

    var getHeroImage = function () {
      return $http.get('data/heroes.json').then(function (result) {
        var filtered = result.data.heroes.filter(function (hero) {
          return hero.name === heroName;
        });
        return filtered[0].image;
      });
    };

    var getHeroDetails = function () {
      return $http.get('data/heroes_details.json').then(function (result) {
        $scope.hero = result.data[heroName];
        return $scope.hero;
      });
    };

    getHeroDetails()
      .then(getHeroImage)
      .then(function (image) {
        $scope.hero.image = image;
      });

  }]);
})();