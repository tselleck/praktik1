(function () {
  'use strict';

  var angular = window.angular;

  var dotaControllers = angular.module('dotaControllers', []);

  // Heroes-view controller
  dotaControllers.controller('HeroesCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {

    var heroesCtrl = this;

    $http.get('data/heroes.json').then(function (result) {
      heroesCtrl.heroes = result.data;

      heroesCtrl.strengthHeroes = _.filter(heroesCtrl.heroes, { 'main_attribute': 'strength' });
      heroesCtrl.agilityHeroes = _.filter(heroesCtrl.heroes, { 'main_attribute': 'agility' });
      heroesCtrl.intelligenceHeroes = _.filter(heroesCtrl.heroes, { 'main_attribute': 'intelligence' });
    });

    heroesCtrl.showPreview = function (hero) {
      heroesCtrl.previewHero = heroesCtrl.heroes[hero.name];
    };

    heroesCtrl.goToHeroDetail = function (hero) {
      $location.path('heroes/' + hero.name);
    };

  }]);

  //Hero-detail-view controller
  dotaControllers.controller('HeroDetailCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {

    var heroDetailCtrl = this;
    var heroName = $routeParams.heroName;

    $http.get('data/heroes.json').then(function (result) {
      heroDetailCtrl.hero = result.data[heroName];
    });
  }]);

  // Match-view controller
  dotaControllers.controller('HatchesCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V1?key=9F5ED90795E74A50AEE916A820A488F2').then(function (result) {
      $scope.matches = result.data.result.matches;
    });
  }]);

  // Main-view controller
  dotaControllers.controller('HainCtrl', ['$scope', '$http', function ($scope, $http) {

  }]);

  //Items-view controller
  dotaControllers.controller('ItemsCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('data/items.json').then(function (result) {
      $scope.items = result.data.items;
    });
  }]);
})();