var app = angular.module('myApp');
app.controller('treatmentDetailController', function(
        $scope, $interval, $location,$http,$routeParams,treatmentDetailService,allergicService,fileUpload) {
	
	
	
	$scope.treatment;
	
	$scope.allergic={
			medicineId:{
				
			},
			patientId:{
				
			}
	}
	
	$scope.treatmentDetail={
			treatmentId:{
					
			},
			medicineId:{
				
			},
			diseases:null
			
	}
	
	$http.get("http://localhost:8080/treatment/" +$routeParams.treatmentId).then(function(response) {
		$scope.treatment = response.data;
		$scope.treatment.patientId.dob = new Date(response.data.patientId.dob);
	});
	
	
////=========Create allergics list======================================
	$scope.createAllergics = function(){
		if($scope.allergics!=null){
			angular.forEach($scope.medicines, function(value, key){
				$scope.allergic.medicineId =value;
				$scope.allergic.patientId=$scope.treatment.patientId;
				allergicService.createAllergic($scope.allergic).then(createAllergicSuccess,createAllergicError)
			});
			//allergicService.createAllergics(JSON.stringify($scope.allergics),$scope.treatment.patientId.id);
		}
		
		else{
			
		}
	}
	
	
	var createAllergicSuccess = function(data) {
		alert('add new treatment Success:');
		$http.get("http://localhost:8080/treatment/" +$routeParams.treatmentId).then(function(response) {
			$scope.treatment = response.data;
			$scope.treatment.patientId.dob = new Date(response.data.patientId.dob);
		})
	};
	var createAllergicError = function(error) {
	};
	
	
////========create treatment deetail=================================	
	$scope.createTreatmentDetail = function(){
		if($scope.medicines!=null){
			angular.forEach($scope.medicines, function(value, key){
				$scope.treatmentDetail.treatmentId = $scope.treatment;
				$scope.treatmentDetail.medicineId =value;
				$scope.treatmentDetail.diseases =$scope.treatment.prescription;
				treatmentDetailService.createTreatmentDetail($scope.treatmentDetail).then(createTreatmentDetailSuccess,createTreatmentDetailError)
				
				
			});
		}
		else{
			
		}
		
	}
	var createTreatmentDetailSuccess = function(data) {
		alert('add new treatment Success:');
		$http.get("http://localhost:8080/treatment/" +$routeParams.treatmentId).then(function(response) {
			$scope.treatment = response.data;
			$scope.treatment.patientId.dob = new Date(response.data.patientId.dob);
		});
	};
	var createTreatmentDetailError = function(error) {
		alert("wrong hreee");
	};
	
	
	
////==========delete treatment detail=================================
	$scope.deleteTreatmentDetail = function(id){
		treatmentDetailService.deleteTreatmentDetail(id).then(deleteTreatmentDetailSuccess,deleteTreatmentDetailError)
	}
	var deleteTreatmentDetailSuccess = function(data) {
		alert('delete treatment Success:');
		$http.get("http://localhost:8080/treatment/" +$routeParams.treatmentId).then(function(response) {
			$scope.treatment = response.data;
			$scope.treatment.patientId.dob = new Date(response.data.patientId.dob);
		});
	};
	var deleteTreatmentDetailError = function(error) {
	};
	
////==========delete allergic==========================================
	$scope.deleteAllergic = function(id){
		allergicService.dleteAllergic(id).then(deleteAllergicSuccess,deleteAllergiclError)
	}
	var deleteAllergicSuccess = function(data) {
		alert('delete allergic Success:');
		$http.get("http://localhost:8080/treatment/" +$routeParams.treatmentId).then(function(response) {
			$scope.treatment = response.data;
			$scope.treatment.patientId.dob = new Date(response.data.patientId.dob);
		})
	};
	var deleteAllergiclError = function(error) {
	};
	
////==========contact chips for prescription and allergics=============	
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
      return $http.get('http://localhost:8080/unAllergic/'+$scope.treatment.patientId.id).then(parse)
    }
   
 ////===================upload file=========================================
   

   

    // NOW UPLOAD THE FILES.
    $scope.uploadFiles = function () {
    	var fd = new FormData();
    	var file = $scope.myFile;
//        fd.append('file', file);
//        fd.append('description',$scope.treatment);
        var uploadUrl ="/uploadMultipleFile";
        console.log(typeof($scope.treatment));
        	fileUpload.uploadFileToUrl(file,$scope.treatment.id, uploadUrl) 

    }

});


app.directive('fileModel', ['$parse', function ($parse) {
	return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
} ])

    
app.service('fileUpload', ['$http', function ($https) {
        
    	this.uploadFileToUrl= function(file,myData, uploadUrl){
            var fd = new FormData();
            fd.append('files', file);
            fd.append('treatmentId',myData);
            $https.post(uploadUrl, fd, {
               transformRequest: angular.identity,
               headers: {'Content-Type': undefined}
            })
         
            .success(function(){
         	alert("ok");
            })
         
            .error(function(){
            	alert("error");
            });
         }
    
     
 }]);

app.directive("fileinput", [function() {
    return {
        scope: {
          fileinput: "=",
          filepreview: "="
        },
        link: function(scope, element, attributes) {
          element.bind("change", function(changeEvent) {
            scope.fileinput = changeEvent.target.files[0];
            var reader = new FileReader();
            reader.onload = function(loadEvent) {
              scope.$apply(function() {
                scope.filepreview = loadEvent.target.result;
              });
            }
            reader.readAsDataURL(scope.fileinput);
          });
        }
      }
    }]);