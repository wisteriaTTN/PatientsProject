var app = angular.module('myApp');

app.controller('treatmentController',['$scope','$http','$routeParams', function($scope,$http,$routeParams){
	
	function getData() { 
		$http.get("http://localhost:8080/patient")
		.success(function(data, status, headers, config){
			$scope.name = data;
		}).error(function(data, status, headers, config){});
		//$rootScope.showTableEnable = true;
	}
	getData();
	
	$scope.findValue($routeParams.id) = function(){
		$http.get("http://localhost:8080/patient/" + $routeParams.id)
	    .success(function(data) {
	         $scope.name = data.id;
	         console.log(data);
	    }).error(function(){
	    	alert("Can't load detail page");
	    });
	};
	
	

}]);