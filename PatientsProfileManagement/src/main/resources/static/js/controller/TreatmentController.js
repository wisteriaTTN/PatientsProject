//var app = angular.module('myApp');


var app = angular.module('myApp');
app.controller('treatmentController', function(
        $scope, $interval, $location,$http,patientService) {
	
var self = this;
    
    self.querySearch = querySearch;
    self.contacts = [];
    self.filterSelected = true;

    /**
     * Search for contacts.
     */
    function querySearch (query) {
      var result;
      if(query) {
        result = loadAndParseContacts().then(function(data) {
             return data.filter(createFilterFor(query))
           })
      } else {
        result = []
      }
      return result
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(contact) {
        return (contact._lowername.indexOf(lowercaseQuery) != -1);;
      };

    }
    function parse (data) {
      return data.data.map(function (c, index) {
          var contact = {
            name: c.name,
            id: c.id,
          };
          contact._lowername = contact.name.toLowerCase();
          return contact;
        })      
    }
    function loadAndParseContacts() {
      return $http.get('http://localhost:8080/medicine').then(parse)
    }
	
	$scope.treatment = {
			patientId : "",
			doctorId : "",
			prescription : "",
			file : "",
		};
	
////==========Get All Treatment=======================================
	$http.get("http://localhost:8080/treatment").then(function(response) {
		$scope.treatments = response.data;
	});
	
	
////==========Get One Patient=======================================
	$scope.getOnePatient = function(id){
		patientService.getOnePatient(id).then(getOneSuccess,getOneError)
	};
	
	var getOneSuccess = function(data) {
		$scope.patient = data;
	};
	var getOneError = function(error) {
	};

});