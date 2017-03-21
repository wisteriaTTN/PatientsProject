var app = angular.module('myApp');



//app.controller('contactlistController', function($scope) {
//
//
//
//
//});

app.directive('ngFiles', ['$parse', function ($parse) {

    function fn_link(scope, element, attrs) {
        var onChange = $parse(attrs.ngFiles);
        element.on('change', function (event) {
            onChange(scope, { $files: event.target.files });
        });
    };

    return {
        link: fn_link
    }
} ])
app.controller('contactlistController', function ($scope, $http) {

    var formdata = new FormData();
    formdata.append('treatmentId', JSON.stringify($scope.treatmentdt));
    var filesArray = [];
    $scope.getTheFiles = function ($files) {
        angular.forEach($files, function (value, key) {
        	filesArray.push(value);
//            formdata.append(key, value);
        });
        formdata.append('files',filesArray)
    };
   

    // NOW UPLOAD THE FILES.
    $scope.uploadFiles = function () {

        var request = {
            method: 'POST',
            url: 'http://localhost:8080/upload',
            data: formdata,
            headers: {
                'Content-Type': undefined
            }
        };

        // SEND THE FILES.
        $http(request)
            .success(function (d) {
                alert(d);
            })
            .error(function () {
            });
    }
});
//app.controller('contactlistController', function(
//        $scope, $interval, $location,medicineService, typeMedicineService,$http,$log) {
//
//
//
////	$scope.repos         = loadAllAC();
//	$scope.searchText = null;
//	$scope.selectedItem = null;
//	$scope.querySearchAC   = querySearchAC;
//
//    // ******************************
//    // Internal methods
//    // ******************************
//
//    /**
//     * Search for repos... use $timeout to simulate
//     * remote dataservice call.
//     */
//    function querySearchAC (query) {
//    	var result;
//      if(query) {
//        result = loadAndParseContactsAC().then(function(data) {
//             return data.filter(createFilterForAC(query))
//           })
//      } else {
//        result = []
//      }
//      return result
//      }
//    
//    function parseAC (data) {
//        return data.data.map(function (repo) {
//        	repo.value = repo.name.toLowerCase();
//            return repo;
//          })      
//      }
//    function loadAndParseContactsAC() {
//        return $http.get('http://localhost:8080/patient').then(parseAC)
//      }
//    /**
//     * Build `components` list of key/value pairs
//
//
//    /**
//     * Create filter function for a query string
//     */
//    function createFilterForAC(query) {
//      var lowercaseQuery = angular.lowercase(query);
//
//      return function filterFn(item) {
//        return (item.value.indexOf(lowercaseQuery) === 0);
//      };
//
//    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//    
//    $scope.yourmodel=[];
//var self = this;
//    
//$scope.querySearch = querySearch;
//
//$scope.contacts = [];
//$scope.filterSelected = true;
//
//    /**
//     * Search for contacts.
//     */
//    function querySearch (query) {
//      var result;
//      if(query) {
//        result = loadAndParseContacts().then(function(data) {
//             return data.filter(createFilterFor(query))
//           })
//      } else {
//        result = []
//      }
//      return result
//    }
//
//    /**
//     * Create filter function for a query string
//     */
//    function createFilterFor(query) {
//      var lowercaseQuery = angular.lowercase(query);
//
//      return function filterFn(contact) {
//        return (contact._lowername.indexOf(lowercaseQuery) != -1);;
//      };
//
//    }
//    function parse (data) {
//      return data.data.map(function (c, index) {
//          var contact = {
//            name: c.name,
//            id: c.id,
//          };
//          contact._lowername = contact.name.toLowerCase();
//          return contact;
//        })      
//    }
//    function loadAndParseContacts() {
//      return $http.get('http://localhost:8080/medicine').then(parse)
//    }
//