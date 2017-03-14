var app = angular.module('myApp');

app.controller('medicineController', function(
        $scope, $interval, $location,$http) {
	
	$scope.medicine = {
			name : "",
			typeId : "",
			producer : "",
			dosage : "",
			mfg : "",
		};
	$http.get("http://localhost:8080/typemedicine").then(function(response) {
		$scope.typemedicines = response.data;
    });
	
	$http.get("http://localhost:8080/medicine").then(function(response) {
		$scope.medicines = response.data;
		angular.forEach($scope.medicines, function(value, key){
			$http.get("http://localhost:8080/typemedicine/" + value.typeId)
  			.then(function(response){
				value.typename = response.data.typeName;
			});
	         });
    });
	
});