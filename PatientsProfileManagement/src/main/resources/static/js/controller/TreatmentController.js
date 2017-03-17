var app = angular.module('myApp');

app.controller('treatmentController', function($scope, $interval, $location,
		$http, $routeParams, patientService, $log, $timeout, $q) {

	$scope.treatment = {
		patientId : "",
		doctorId : "",
		prescription : "",
		file : "",
	};

	$http.get("http://localhost:8080/treatment").then(function(response) {
		$scope.treatments = response.data;
	});

	// ///------------get All Treatment
	// $scope.getTreatment = function(data){
	// treatmentService.getTreatment().then(getSuccess,getError);
	// }
	// var getSuccess = function(data) {
	// $scope.treatments = data;
	// };
	// var getError = function(error) {
	// $scope.error = "Could not find any data"
	// };

	// /------------get Id Patient

	$scope.getOnePatient = function(id) {
		patientService.getOnePatient(id).then(getOneSuccess, getOneError)
	};
	var getOneSuccess = function(data) {
		$scope.patient = data;

	};
	var getOneError = function(error) {
	};

	// /------------get name doctor
	$http.get("http://localhost:8080/treatment/name").then(function(response) {
		$scope.doctor = response.data;
	});

	// /-----------create treatment ------------
	// $scope.treat.patientId=patient.id;
	// $scpoe.treat.doctorId=user.id;
	// $scope.treat.date= new Date();
	// $scope.treat.file="";

	$http.get("http://localhost:8080/treatment", $scope.treatment).then(
			function(response) {
				$scope.treatment = response.data;
			});

	// /--------------get all medicine-----------
	$http.get("http://localhost:8080/medicine").then(function(response) {
		$scope.medicine = response.data;
	});
	// ---------------autocomplete-------------------
	function medicineCon($scope) {
		var self = this;
		self.querySearch = querySearch;
		self.allContacts = loadContacts();
		self.contacts = [ self.allContacts[0] ];
		self.filterSelected = true;

		function querySearch(query) {
			var results = query ? self.allContacts
					.filter(createFilterFor(query)) : [];
			return results;
		}

		function createFilterFor(query) {
			var lowercaseQuery = angular.lowercase(query);
			return function filterFn(contact) {
				return (contact._lowername.indexOf(lowercaseQuery) != -1);
				;
			};
		}

		function loadContacts() {
			var contacts = [ 'Roberto Karlos', 'Bob Crestor', 'Nigel Rick',
					'Narayana Garner', 'Anita Gros', 'Megan Smith',
					'Tsvetko Metzger', 'Hector Simek', 'James Roody' ];
			return contacts.map(function(c, index) {
				var cParts = c.split(' ');
				var contact = {
					name : c,
					email : cParts[0][0].toLowerCase() + '.'
							+ cParts[1].toLowerCase() + '@example.com',
					image : 'http://lorempixel.com/50/50/people?' + index
				};
				contact._lowername = contact.name.toLowerCase();
				return contact;
			});
		}
	}

});