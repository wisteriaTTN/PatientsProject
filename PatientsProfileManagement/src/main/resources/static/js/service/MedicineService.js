var app = angular.module('myApp');

app.factory('medicineService', function($http){
  var getMedicie = function() {
	    return $http.get("http://localhost:8080/medicine")
	      .then(function(response) {
	        return response.data;
	      });
  };
  var getOneMedicie = function(id){
	  return $http.get("http://localhost:8080/medicine/" + id)
	  .then(function(response){
			return response.data;
		});
  }
  
  var createMedicie = function(medicine){
	  return $http.post("http://localhost:8080/medicine",medicine)
	  .then(function(response){
			return response.data;
		});
  }
  var updateMedicie = function(id,medicine){
	  return $http.put("http://localhost:8080/medicine/"+id,medicine)
	  .then(function(response){
			return response.data;
		});
  }
  
  var deleteMedicie = function(id){
	  return $http.delete("http://localhost:8080/medicine/"+id)
	  .then(function(response){
			return response.data;
		});
  }
  
  var deleteAllMedicie = function(){
	  return $http.delete("http://localhost:8080/medicine")
	  .then(function(response){
			return response.data;
		});
  }
  
  var getTypeMedicie = function() {
	    return $http.get("http://localhost:8080/typemedicine")
	      .then(function(response) {
	        return response.data;
	      });
};
  return {
	  getMedicie:getMedicie,
	  getOneMedicie:getOneMedicie,
	  createMedicie:createMedicie,
	  updateMedicie:updateMedicie,
	  deleteMedicie:deleteMedicie,
	  deleteAllMedicie:deleteAllMedicie,
	  getTypeMedicie:getTypeMedicie,
  }
});