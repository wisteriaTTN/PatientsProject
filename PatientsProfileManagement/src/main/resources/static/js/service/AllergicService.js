var app = angular.module('myApp');

app.factory('allergicService', function($http){
	
	 var createAllergics = function(allergics){
		  return $http.post("http://localhost:8080/addAllergicList",allergics)
		  .then(function(response){
				return response.data;
			});
	  }
	 
	 return{
		 createAllergics:createAllergics,
	 }
	
});