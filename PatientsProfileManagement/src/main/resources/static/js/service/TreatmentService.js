var app = angular.module('myApp');

app.factory('treatmentService', function($http){
	
	 var createAllergics = function(allergics){
		  return $http.post("http://localhost:8080/addAllergicList",allergics)
		  .then(function(response){
				return response.data;
			});
	  }
	 
	 var createTreatment = function(treatment){
		 return $http.post("http://localhost:8080/treatment",treatment)
		  .then(function(response){
				return response.data;
			});
	 }
	 
	 var getAllTreatment = function(){
		 return  $http.get("http://localhost:8080/treatment",treatment)
		  .then(function(response){
				return response.data;
			});
	 }
	 
	 return{
		 createAllergics:createAllergics,
		 getAllTreatment:getAllTreatment,
		 createTreatment:createTreatment,
	 }
	
});