'use strict';

/**
 * @ngdoc function
 * @name bronxApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bronxApp
 */
angular.module('bronxApp')
  .controller('MainCtrl',
  	function ($scope, $state, auth) {
	  	var mainCtrl = this;
	  	
	  	mainCtrl.userData = {};
	    
	    mainCtrl.signIn = function () {
	    	var promise = auth.logIn(mainCtrl.userData);
	    	promise
	    	.success(function (result) {
	    		$state.go('state2');
	    	})
	    	.error(function (reason) {
	    		console.log(reason);
	    	})
	    };
	  });