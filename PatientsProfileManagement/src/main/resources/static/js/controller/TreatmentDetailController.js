var app = angular.module('myApp');
app.controller('treatmentDetailController', function(
        $scope, $interval, $location,$http,$routeParams) {
	
	
	
	$scope.treatment=[];
	
	$http.get("http://localhost:8080/treatment/" +$routeParams.treatmentId).then(function(response) {
		$scope.treatment = response.data;
		$scope.treatment.patientId.dob = new Date(response.data.patientId.dob);
	});

});
//
//app.controller('treatmentDetailController', function(
//        $scope, $interval, $location,$http,$routeParams) {
//	
//	$http.get("http://localhost:8080/treatment/" +$routeParams.treatmentId).then(function(response) {
//		$scope.treatment = response.data;
//	});
//	
//	$http.get("http://localhost:8080/treatment").then(function(response) {
//		$scope.patient = response.data;
//    });
//
//});