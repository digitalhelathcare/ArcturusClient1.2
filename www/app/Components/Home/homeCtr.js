

angular.module('starter.homeCtrl', ['ngStorage'])





    .controller('homeCtrl', function($scope,GetContent,$ionicLoading,GetProfile,$rootScope,$state ,$ionicPopover,$localStorage,$stateParams,$http, $cordovaFileOpener2,$timeout,$window, ionicMaterialMotion, ionicMaterialInk,$ionicSideMenuDelegate) {


        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab('right');

        $timeout(function() {
            ionicMaterialMotion.fadeSlideIn({
                selector: '.animate-fade-slide-in .item'
            });
        }, 200);

        // Activate ink for controller
        ionicMaterialInk.displayEffect();

        $ionicSideMenuDelegate.canDragContent(true);

        $scope.CallTel = function(tel) {
            debugger;
            window.location.href = 'tel:'+ tel;
        }


        $scope.pdfUrl = 'app/Arcturus.pdf';
        $scope.httpHeaders = { Authorization: 'Bearer some-aleatory-token' };

		
		 $scope.show = function() {
            $ionicLoading.show({
                template: '<ion-spinner icon="android" class="spinner-balanced" ></ion-spinner>'
            });
        };

        $scope.hide = function(){
            $ionicLoading.hide();
        };


      /*  var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';

        $scope.popover = $ionicPopover.fromTemplate(template, {
            scope: $scope
        });*/

        // .fromTemplateUrl() method
        $ionicPopover.fromTemplateUrl('app/Components/Home/popover.html', {
            scope: $scope
        }).then(function(popover) {
                $scope.popover = popover;
            });


        $scope.openPopover = function($event) {
            debugger;

            $scope.popover.show($event);
        };
        $scope.closePopover = function() {
            $scope.popover.hide();
        };

        $scope.actType =  function(){ return $localStorage.accountType;  }
		
		
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
 
		




    })


