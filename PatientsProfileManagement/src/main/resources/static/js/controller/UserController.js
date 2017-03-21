var app = angular.module('myApp');

app.controller('userController', function($scope, $interval, $location, userService, $http,$filter) {
	$scope.user = {
			id : "",
			active: "",
			name : "",
			username: "",
			specialist: "",
			address: "",
			sex: "",
		};
	$scope.userAdmin = {
			id : "",
			active: "",
			name : "",
			username: "",
			specialist: "",
			address: "",
			sex: "",
		};
	
	$scope.userDoctor = {
			id : "",
			active: "",
			name : "",
			username: "",
			specialist: "",
			address: "",
			sex: "",
		};
	
	$scope.userNurse = {
			id : "",
			active: "",
			name : "",
			username: "",
			specialist: "",
			address: "",
			sex: "",
		};
	
	$scope.usersAdmin = [];
	$scope.usersDoctor = [];
	$scope.usersNurse = [];
	
	$scope.sort = function(keyname){
		$scope.sortKey = keyname;
		$scope.reverse = !$scope.reverse;
	}

	$http.get("http://localhost:8080/userbyrole/1").then(function(response) {
		$scope.usersAdmin = response.data;
    });
	$http.get("http://localhost:8080/userbyrole/2").then(function(response) {
		$scope.usersDoctor = response.data;
    });
	
	$http.get("http://localhost:8080/userbyrole/3").then(function(response) {
		$scope.usersNurse = response.data;
    });
	$http.get("http://localhost:8080/userProfile").then(function(response) {
		$scope.userLogged = response.data;
    });
	/////------------get All User Admin -----------------
	$scope.getAdmin = function(data){
		userService.getAdmin().then(getAdminSuccess,getAdminSuccess);
	}
	var getAdminSuccess = function(data) {
		$scope.usersAdmin = data;
	};
	var getAdminError = function(error) {
		$scope.error = "Could not find any data"
	};
	
/////------------get All User Doctor -----------------
	$scope.getDoctor = function(data){
		userService.getDoctor().then(getDoctorSuccess,getDoctorSuccess);
	}
	var getDoctorSuccess = function(data) {
		$scope.usersDoctor = data;
	};
	var getDoctorError = function(error) {
		$scope.error = "Could not find any data"
	};
	
/////------------get All User Nurse -----------------
	$scope.getNurse = function(data){
		userService.getNurse().then(getNurseSuccess,getNurseSuccess);
	}
	var getNurseSuccess = function(data) {
		$scope.usersNurse = data;
	};
	var getNurseError = function(error) {
		$scope.error = "Could not find any data"
	};
	
/////----------get one User-------------
	$scope.getOneUser = function(id){
		userService.getOneUser(id).then(getOneSuccess,getOneError)
	};
	var getOneSuccess = function(data) {
		$scope.curentUser = data;				
	};
	var getOneError = function(error) {
	};
	
/////------------Delete User by Id -----------------
	$scope.deleteUser= function(id){
		userService.deleteUser(id).then(deleteSuccess,deleteError);
		
	};
	var deleteSuccess = function(data) {
		alert('delete User Success:' + data.name);
		$scope.getAdmin();
		$scope.getDoctor();
		$scope.getNurse();
	};
	var deleteError = function(error) {
	};
/////------------Update User by Id -----------------
	$scope.updateUser = function(id,user){
		userService.updateUser(id,user).then(updateSuccess,updateError);
	};
	var updateSuccess = function(data) {
		alert('update User Success:');
		$scope.getAdmin();
		$scope.getDoctor();
		$scope.getNurse();
		$http.get("http://localhost:8080/userProfile").then(function(response) {
			$scope.userLogged = response.data;
	    });
	};
	var updateError = function(error) {
	};
/////------------Change Password -----------------
	$scope.changePass = function(){
		userService.changePass($scope.user).then(changePassSuccess,updateError);
	};
	var changePassSuccess = function(data) {
		alert('Change Password Success:');
	};
	var updateError = function(error) {
	};
///--------------------Get current User---------------
	$scope.getCurrentUser = function(){
		userService.currentUser().then(getCSuccess, getCError)
	};
	var getCSuccess = function(data){
		$scope.curentUser = data;
	};
	var getCError = function(error){
		
	};
	
});	
	