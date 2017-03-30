
angular.module('starter.menuCtrl', ['ngStorage'])

.controller('menuCtrl', function($scope, $ionicModal,$window,GetContent,hitLogout,$ionicLoading, $ionicPopover,GetProfile,$rootScope,$state, $timeout,$localStorage) {

        $scope.firstName = function(){ return $localStorage.firstName; }
        $scope.lastName = function(){ return $localStorage.lastName; }


      /*  $scope.patientDetails=[];
        $scope.patientDetails = $localStorage.PatientDetails;*/

        $scope.patientName = function(){return  $localStorage.patname; }


    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };


	$scope.home = function() {
		$state.go('app.home');
		
	}
	$scope.feedbak = function() {
	$state.go('app.Feedback');	
		
	}
	$scope.help = function() {
		$state.go('app.help');
		
	}


        $scope.actType =  function(){ return $localStorage.accountType;  }


	
	
	
        $scope.show = function() {
            $ionicLoading.show({
                template: '<ion-spinner icon="android" class="spinner-balanced" ></ion-spinner>'
            });
        };

        $scope.hide = function(){
            $ionicLoading.hide();
        };


        $scope.logout = function () {
            debugger;
                var  userId    = $localStorage.userId ;
                var  sessionId = $localStorage.sessionId;
            $scope.show($ionicLoading);
            hitLogout.userLogoutService(userId,sessionId).then(function(logoutResult){
                debugger;
                console.log("login response:" +logoutResult)
                var GetResultVal = logoutResult.resultObject;
                var ResultVal = logoutResult.responseCode;

                debugger;
                if(logoutResult.responseCode == 0){
                    $scope.hide($ionicLoading);
                    $window.localStorage.clear();
                    $state.go('app.login', {}, {reload: false}).then(function(){
                        setTimeout(function() {
                            /*  $window.location.reload(true);*/
                        }, 500);
                    })

                }

                else{
                    $scope.hide($ionicLoading);
                }
            });


        }

		// Open Patients Rights Pdf Form

 $scope.PatientsRights= function(){
    var pdfUrl  = 'http://arcturus.castusinfo.com/ArcturusPdfForms/Arcturus%20Patient%20Admission%20Book.pdf';
 if (ionic.Platform.isAndroid()) {
	 
		  pdfUrl = 'https://docs.google.com/viewer?url=' + encodeURIComponent(pdfUrl);
   }
   
          var ref = window.open(pdfUrl,'_blank', 'location=no,toolbar=yes,EnableViewPortScale=yes');
  }

    // Open ConsentForms Forms
	
  $scope.ConsentForms= function(){
    var pdfUrl  = 'http://arcturus.castusinfo.com/ArcturusPdfForms/Arcturus%20Hospice%20PH%20Book%20CONSENTS.pdf';
 if (ionic.Platform.isAndroid()) {
	 
		  pdfUrl = 'https://docs.google.com/viewer?url=' + encodeURIComponent(pdfUrl);
   }
   
          var ref = window.open(pdfUrl,'_blank', 'location=no,toolbar=yes,EnableViewPortScale=yes');
  }
 // Open HospiceQualifications Pdf Form
 
   $scope.HospiceQualifications= function(){
    var pdfUrl  = 'http://arcturus.castusinfo.com/ArcturusPdfForms/Arcturus%20Hospice%20PH%20Book%20Admission%20Criteria.pdf';
 if (ionic.Platform.isAndroid()) {
	 
		  pdfUrl = 'https://docs.google.com/viewer?url=' + encodeURIComponent(pdfUrl);
   }
   
          var ref = window.open(pdfUrl,'_blank', 'location=no,toolbar=yes,EnableViewPortScale=yes');
  }
 
 
 $scope.CallTel = function(tel) {
            debugger;
            window.location.href = 'tel:'+ tel;
        }
})