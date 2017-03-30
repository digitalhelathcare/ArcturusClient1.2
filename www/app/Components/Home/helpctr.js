angular.module('starter.HelpCtrl', ['ngStorage'])
    .controller('helpCtr', function($scope, $timeout,$rootScope,signUpReqServices,$localStorage, $stateParams, $state,GetContent,ionicMaterialInk,$ionicSideMenuDelegate) {
        $scope.clearFabs = function() {
            var fabs = document.getElementsByClassName('button-fab');
            if (fabs.length && fabs.length > 1) {
                fabs[0].remove();
            }
        };
        $timeout(function() {
            $scope.isExpanded = false;
            $scope.$parent.setExpanded(false);
            $scope.$parent.setHeaderFab('left');
            /*$scope.$parent.clearFabs();*/
            $scope.$parent.showHeader();
        }, 0);
        $timeout(function() {
            $scope.isExpanded = false;
            $scope.$parent.setExpanded(false);
        }, 300);
        ionicMaterialInk.displayEffect();

        $ionicSideMenuDelegate.canDragContent(true);


        $scope.patientDetails=[];
        $scope.patientDetails = $localStorage.PatientDetails;

        $scope.bindCall=function(patientName){
            debugger;

            $localStorage.patname= patientName;


        }

        var acc = document.getElementsByClassName("accordion");
        var i;

        for (i = 0; i < acc.length; i++) {
            acc[i].onclick = function() {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight){
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            }
        }

    });