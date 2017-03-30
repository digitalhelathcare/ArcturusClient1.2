angular.module('starter.forgotOtpCtr', ['ngStorage','toaster','ngAnimate'])


    .controller('forgotOtpCtr', function($scope,ionicToast, $stateParams,$ionicLoading,toaster,commonServices,$localStorage,$state,$rootScope, $timeout, ionicMaterialMotion, ionicMaterialInk,$ionicSideMenuDelegate) {
        $scope.$parent.clearFabs();
        $timeout(function() {
            $scope.$parent.showHeader();
        }, 0);

        // Activate ink for controller
        ionicMaterialInk.displayEffect();

        $ionicSideMenuDelegate.canDragContent(false);

        $scope.show = function() {
            $ionicLoading.show({
                template: '<ion-spinner icon="android" class="spinner-balanced" ></ion-spinner>'
            });
        };

        $scope.hide = function(){
            $ionicLoading.hide();
        };

        //-----  otp call method -------//

        $scope.otpCall= function(validateOTP){
            debugger;

            var phoneNumber= $rootScope.account;

            var email =  $localStorage.emailId;
            if($scope.OtpForm.$valid) {
                console.log(phoneNumber,email,+validateOTP)
                $scope.show($ionicLoading);

                //----------      validateOTP Service call ---------//

                commonServices.validateOTPService(phoneNumber,email,validateOTP).then(function(GetRsltInfo){
                    debugger;
                    console.log("signUpOtp response"+GetRsltInfo)
                    var GetRstval = GetRsltInfo.resultObject;
                    var ResltVal = GetRsltInfo.responseCode;
                    debugger;


                    if(GetRsltInfo.responseCode == 0){

                        $localStorage.PhoneNumber=phoneNumber;
                        $state.go('app.resetpassword');
                        $scope.hide($ionicLoading);
                    }
                    else if (GetRsltInfo.errorMessage =="Invalid passcode"){
                        $scope.hide($ionicLoading);
                        /*$scope.otpError = GetRsltInfo.errorMessage;*/
                        /*toaster.pop('error', "", '<ul><li>Invalid passcode</li></ul>', 3000, 'trustedHtml');*/
                        var toast = ({
                            message : 'Invalid passcode',
                            position: 'top',
                            stick: false,
                            timeout: 2000,

                            cssClass: "toast_section_error"
                        });
                        ionicToast.show(toast.message,toast.position,toast.stick,toast.timeout,toast.cssClass);

                    }
                    else if(GetRsltInfo.errorMessage =="OTP is expired"){
                        $scope.hide($ionicLoading);
                        /*toaster.pop('error', "", '<ul><li>OTP is expired</li></ul>', 3000, 'trustedHtml');*/
                        var toast = ({
                            message : 'OTP is expired',
                            position: 'top',
                            stick: false,
                            timeout: 2000,

                            cssClass: "toast_section_error"
                        });
                        ionicToast.show(toast.message,toast.position,toast.stick,toast.timeout,toast.cssClass);

                    }
                    /* else{
                     $scope.hide($ionicLoading);
                     }*/

                });
            }
        }
    });