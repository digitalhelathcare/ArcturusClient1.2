

angular.module('starter.resetPasswordCtr', ['ngStorage','toaster','ngAnimate'])
    .controller('resetPasswordCtr', function($scope,ionicToast, $timeout,$localStorage,toaster,updatePasswordService,$ionicLoading,$state,$rootScope,$ionicPush, $stateParams, ionicMaterialInk,$ionicSideMenuDelegate) {


        $ionicPush.register().then(function(t) {
            return $ionicPush.saveToken(t);}).then(function(t) {
                console.log('Token saved:', t.token);
            });
        $scope.$on('cloud:push:notification', function(event, data) {
            var msg = data.message;
            alert(msg.title + ': ' + msg.text);
        });

        $timeout(function() {
            $scope.isExpanded = false;
            $scope.$parent.clearFabs(false);
            $scope.$parent.setExpanded(false);
            $scope.$parent.setHeaderFab('left');

            $scope.$parent.showHeader();
        }, 0);


        $ionicSideMenuDelegate.canDragContent(false)

        $scope.show = function() {
            $ionicLoading.show({
                template: '<ion-spinner icon="android" class="spinner-balanced" ></ion-spinner>'
            });
        };

        $scope.hide = function(){
            $ionicLoading.hide();
        };

        debugger;

        //----  SaveProfileData call method -------//




        $scope.updatePassword= function(password){
            debugger;

            if($scope.ResetForm.password_c.$error.nxEqualEx){

                /*toaster.pop('error', "", '<ul><li>Password Do Not Match</li></ul>', 3000, 'trustedHtml');*/
                var toast = ({
                    message : 'Password do not match',
                    position: 'top',
                    stick: false,
                    timeout: 2000,

                    cssClass: "toast_section_error"
                });
                ionicToast.show(toast.message,toast.position,toast.stick,toast.timeout,toast.cssClass);


            }


                console.log("signUp input values"+password)
            var userId =$localStorage.userId;
            if($scope.ResetForm.$valid) {

            $scope.show($ionicLoading);
            updatePasswordService.UpdatePassword(userId,password).then(function(resultData){

                    debugger;
                    console.log("registration response"+resultData)

                    if(resultData.responseCode == 0){

                        $scope.hide($ionicLoading);
                        $state.go('app.login');
                        var toast = ({
                            message : 'Password updated please login',
                            position: 'top',
                            stick: false,
                            timeout: 2000,

                            cssClass: "toast_section"
                        });
                        ionicToast.show(toast.message,toast.position,toast.stick,toast.timeout,toast.cssClass);

                    }
                    else{
                        $scope.hide($ionicLoading);
                    }

                });

            }

        }

    })


