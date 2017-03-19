//var app = angular.module('myApp');


var app = angular.module('myApp');
app.controller('treatmentController', function(
        $scope, $interval, $location,$http,patientService,userService,treatmentService) {
	
	$scope.treatment ={
			date : null,
			file : null,
			prescription : null,
			doctorId : {
					
			},
			patientId : {
					
			}
	}
	
	$scope.treatmentDetail={
			treatmentId:{
					
			},
			medicineId:{
				
			},
			diseases:null
			
	}
	
////////////////autocomplete for patient
	
	$scope.searchText = null;
	$scope.selectedPatient = null;
	$scope.querySearchAC   = querySearchAC;

    function querySearchAC (query) {
    	var result;
      if(query) {
        result = loadAndParseAC().then(function(data) {
             return data.filter(createFilterForAC(query))
           })
      } else {
        result = []
      }
      return result
      }
    
    function parseAC (data) {
        return data.data.map(function (repo) {
        	repo.value = repo.name.toLowerCase();
            return repo;
          })      
      }
    
    function loadAndParseAC() {
        return $http.get('http://localhost:8080/patient').then(parseAC)
      }
    
    function createFilterForAC(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(item) {
        return (item.value.indexOf(lowercaseQuery)  != -1);
      };

    }
	
 ///////////////contacts chip for medicine and allergic
    $scope.querySearch = querySearch;
    $scope.medicines = [];
	$scope.allergics = [];
	$scope.filterSelected = true;

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
    
 //////////////////////////////////////////////////////////////////////
	
////==========Get All Treatment=======================================
	$http.get("http://localhost:8080/treatment").then(function(response) {
		$scope.treatments = response.data;
	});
	
	$scope.getAllTreatment= function(){
		treatmentService.getAllTreatment().then(getAllSuccess,getAllError)
	}
	var getAllSuccess = function(data) {
		$scope.treatments = data;
	};
	var getAllError = function(error) {
	};
	
////==========Get One Patient=======================================
	$scope.getOnePatient = function(id){
		patientService.getOnePatient(id).then(getOneSuccess,getOneError)
	};
	
	var getOneSuccess = function(data) {
		$scope.patient = data;
	};
	var getOneError = function(error) {
	};
////==========Get current doctor=======================================
	$http.get("http://localhost:8080/userlogged").then(function(response) {
		$scope.doctor = response.data;
	});
	
	
	$scope.getLoginUser = function(id){
		userService.getLoginUser().then(getLoginUserSuccess,getLoginUserError)
	};
	
	var getLoginUserSuccess = function(data) {
		$scope.user = data;
	};
	var getLoginUserError = function(error) {
	};
	
////==========Create treatment=========================================
	$scope.createTreatment = function(){
		$scope.treatment.date = new Date();
		$scope.treatment.patientId = $scope.selectedPatient;
		$scope.treatment.doctorId = $scope.doctor
		treatmentService.createTreatment($scope.treatment).then(createTreatmentSuccess,createTreatmentError);
	};
	var createTreatmentSuccess = function(data) {
		alert('add new treatment Success:' + data.name);
		
		getAllTreatment();
	};
	var createTreatmentError = function(error) {
	};
	
	
	
});