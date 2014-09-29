'use strict';

/**
 * @ngdoc overview
 * @name bronxApp
 * @description
 * # bronxApp
 *
 * Main module of the application.
 */
angular
  .module('bronxApp', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/state1");
  //
  // Now set up the states
  $stateProvider
    .state('state1', {
      url: "/state1",
      templateUrl: "views/main.html",
      controller: "MainCtrl as mainCtrl"
    })
    .state('state2', {
      url: "/state2",
      templateUrl: "views/home.html",
      controller: "HomeCtrl as homeCtrl"
    });
});
