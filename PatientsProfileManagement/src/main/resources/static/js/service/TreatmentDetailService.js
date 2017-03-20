var app = angular.module('myApp');

app.factory('treatmentDetailService', function($http){
	
	 
	 var createTreatmentDetail = function(treatment){
		 return $http.post("http://localhost:8080/treatment",treatment)
		  .then(function(response){
				return response.data;
			});
	 }
	 
	 var getAllTreatmentDetail = function(){
		 return  $http.get("http://localhost:8080/treatmentdt")
		  .then(function(response){
				return response.data;
			});
	 }
	 
	 return{
		 createTreatmentDetail:createTreatmentDetail,
		 getAllTreatmentDetail:getAllTreatmentDetail,
	 }
	
});