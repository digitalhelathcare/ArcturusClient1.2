/**
 * Created by Darshan on 1/24/2017.
 */

angular.module('starter.contentCtrl', ['ngStorage'])
    .controller('contentCtrl', function($scope, $timeout,$rootScope,$ionicLoading,signUpReqServices,$ionicPopup, $window,$stateParams,$localStorage, $state,GetContent,ionicMaterialInk,$ionicSideMenuDelegate) {
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

        $scope.show = function() {
            $ionicLoading.show({
                template: '<ion-spinner icon="android" class="spinner-positive" ></ion-spinner>'
            });
        };

        $scope.hide = function(){
            $ionicLoading.hide();
        };

        //--login call method ---//
        debugger;

        $scope.contentCall= function(){

            debugger;
            var  userId =  $localStorage.userId;
            var  contentName = "arcturus";
            var sessionId = $localStorage.sessionId;
                $scope.show($ionicLoading);

                //---isAccountExit service call---//

            GetContent.getContentService(userId,contentName,sessionId).then(function(GetResult){

                    debugger;
                    console.log("login response:" +GetResult)

                    debugger;
                    if(GetResult.responseCode == 0){
                        var GetResultVal = GetResult.resultObject;
                        var ResultVal = GetResult.responseCode;
                        var GetResultText = GetResult.resultObject.contentText;
                        $scope.HomeContentText= GetResult.resultObject.contentText;


                        $scope.hide($ionicLoading);
                        $state.go('app.content');
                    }
                    else if(GetResult.errorMessage =="Session is Expired"){
                        $scope.hide($ionicLoading);
                        $scope.showConfirm = function() {
                            debugger;
                            var alertPopup = $ionicPopup.alert({
                                title: 'Session is Expired',
                                template: ''
                            });

                            alertPopup.then(function(res) {
                                debugger;
                                $window.localStorage.clear();
                                $state.go('app.login');
                                $ionicPopup.close();
                            });


                        };
                        $scope.showConfirm();
                    }
                    else{
                        $scope.hide($ionicLoading);

                    }
                });


        }
        $scope.contentCall();

    }
)
