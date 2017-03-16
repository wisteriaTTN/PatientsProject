var app = angular.module('myApp', ['ngRoute','ngResource','angularUtils.directives.dirPagination']);
app.config(function($routeProvider){
    $routeProvider
	    .when('/patient',{
	        templateUrl: '/views/patient.html',
	        controller: 'PatientController'
	    })
	    .when('/',{
	        templateUrl: '/views/homepage.html',
	        controller: 'HomeController'
	    })
	    .when('/patient',{
	        templateUrl: '/views/patient.html',
	        controller: 'patientController'
	    })
	    .when("/medicine", {
            templateUrl: "/views/medicine.html",
            controller: "medicineController"
          })
    	.when('/user',{
    		templateUrl: '/views/user.html',
    		controller: "userController"
    	})
    .when('/treatment',{
		templateUrl: '/views/treatment.html',
		controller: "treatmentController"
	})
	 
	
	
    .when('/treatmentdetail',{
		templateUrl: '/views/treatmentdetail.html',
		controller: "treatmentDetailController"
	});
    	
        /*.otherwise(
            { redirectTo: '/'}
        );*/
});
