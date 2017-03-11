var app = angular.module('myApp', ['ngRoute','ngResource']);
app.config(function($routeProvider){
    $routeProvider
	    .when('/patient',{
	        templateUrl: '/views/patient.html',
	        controller: 'PatientController'
	    })
	    .when('/',{
	        templateUrl: '/views/homepage.html',
	        controller: 'HomeController'
	    });
    	
        /*.otherwise(
            { redirectTo: '/'}
        );*/
});
