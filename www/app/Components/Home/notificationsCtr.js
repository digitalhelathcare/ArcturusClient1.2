

angular.module('starter.notificationCtrl', [])





    .controller('notificationCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,$ionicSideMenuDelegate) {
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


    })


