var app = angular.module('myApp');

app.controller('userController', function($scope, $interval, $location,$http,$filter) {
	$scope.user = {
			id : "",
			active: "",
			name : "",
			username: "",
			specialist: "",
			address: "",
			sex: "",
		};

	$http.get("http://localhost:8080/user").then(function(response) {
		$scope.users = response.data;
		alert($scope.users['rolesList'][5].roles);
		/*var index = $scope.user.roleslist.map(function(item){
			return item.roles;
		}).indexOf(1);*/
    });

/*	$http.get("http://localhost:8080/roles").then(function(response) {
		$scope.roles = response.data;
    });*/
	
	/////------------get All User
	$scope.getUser = function(data){
		userService.getUser().then(getSuccess,getSuccess);
	}
	var getSuccess = function(data) {
		$scope.users = data;
	};
	var getError = function(error) {
		$scope.error = "Could not find any data"
	};
	
});	
	