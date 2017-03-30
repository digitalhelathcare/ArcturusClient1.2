
angular.module('starter.constructionCtrl', ['ngStorage','toaster','ngAnimate'])

    .controller('splashCtrl', function($scope, $stateParams,GetProfile,$ionicLoading,toaster,$ionicPopup,$window, $timeout,$rootScope,$localStorage,UpdateProfileService, $state,ionicMaterialMotion, ionicMaterialInk,$ionicSideMenuDelegate) {
        debugger;
        // Set Header
    $scope.$parent.hideHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

        $ionicSideMenuDelegate.canDragContent(false);


    })