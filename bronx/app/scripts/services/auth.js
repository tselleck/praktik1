angular.module('bronxApp')
	.service('auth', function ($http) {
		var currentUser = null;
		return {
			getCurrentUser: function () {
				return currentUser;
			},
			logIn: function (user) {
	    		return $http.post(
	    			'https://membership-creator.mikzdev.se/' +
	            	'api/v3/user/logon', user).success(function (result) {
	            		currentUser = result;
	            	});
	    	},
	    	logOut: function () {
	    		return $http.post(
	    			'https://membership-creator.mikzdev.se/' +
	            	'api/v3/user/logoff').success(function () {
	            		currentUser = null;
	            	});
	    	}
		};
	});
