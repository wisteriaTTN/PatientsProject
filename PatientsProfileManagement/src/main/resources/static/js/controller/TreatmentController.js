var app = angular.module('myApp');

app.controller('treatmentController', function(
        $scope, $interval, $location, patientService,$http,$filter) {
	$scope.patient = {
			idpatient : "",
			iddoctor: "",
			doctorname : "",
			diagnotics : "",
		};
	$http.get("http://localhost:8080/treatment").then(function(response) {
		$scope.treatment = response.data;
    });
	$scope.getOnePatient = function(id){
		patientService.getOnePatient(id).then(getOneSuccess,getOneError)
};
var getOneSuccess = function(data) {
	$scope.patient = data;
};
var getOneError = function(error) {
};




$http.get("http://localhost:8080/treatment").then(function(response) {
	$scope.treatment = response.data;
});
$scope.getUser = function(userName){
	userService.getUser(userName).then(getUserSuccess,getUserError)
};
var getUserSuccess = function(data) {
$scope.user = data;
};
var getUserError = function(error) {
};







	
});

