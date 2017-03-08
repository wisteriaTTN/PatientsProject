var app = angular.module('myApp', ['ngRoute','ngResource']);
app.config(function($routeProvider){
    $routeProvider
	    .when('/another',{
	        templateUrl: '/patientprofile/views/another.html',
	        controller: 'AnotherController'
	    })
        .otherwise(
            { redirectTo: '/'}
        );
});
