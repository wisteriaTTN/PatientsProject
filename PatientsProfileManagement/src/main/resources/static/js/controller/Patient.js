var app = angular.module('myApp');
app.controller('PatientController',['$scope','$http', function($scope,$http){
	
	$http.get("http://localhost:8080/patient")
    .success(function(data) {
        $scope.patients = data;
    }).error(function(){
    	alert("Can't load data");
    });
	
}]);