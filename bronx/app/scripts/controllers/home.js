angular.module("bronxApp")
	.controller("HomeCtrl", function ($scope, $state, auth) {
		var homeCtrl = this;

		homeCtrl.user = auth.getCurrentUser();

		homeCtrl.signOut = function () {
			auth.logOut()
			.success(function (result) {
				$state.go('state1');
			})
			.error(function (reason) {
				console.log(reason);
			});
    	};
	});