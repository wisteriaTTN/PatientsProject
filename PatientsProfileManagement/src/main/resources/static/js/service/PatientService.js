var app = angular.module('myApp');

app.factory('storeService', function($http){
  var getPatient = function() {
	    return $http.get("http://localhost:8080/patient")
	      .then(function(response) {
	        return response.data;
	      });
  };
  
  var getDetail = function(id) {
	  return $http.get("http://localhost:8080/patient/" + id)
	  			.then(function(response){
					return response.data;
				});
  }
  var getPatientTrament = function(id) {
	  return $http.get("http://localhost:8080/patient/" + id)
	  			.then(function(response){
					return response.data;
				});
  }
  
  return {
	  getProduct: getProduct,
	  add: add,
	  increaseData: increaseData,
  	  getDetail: getDetail,
  	  decreaseData:decreaseData,
  }
});
