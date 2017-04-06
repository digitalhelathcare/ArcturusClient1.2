angular.module('starter.passwordCtrl', ['ngStorage','toaster','ngAnimate'])

    .controller('passwordCtrl', function($scope,ionicToast,forgotService, $stateParams,$ionicLoading,toaster,$window,AccountExistsService,$localStorage,$state,$rootScope, $timeout, ionicMaterialMotion, ionicMaterialInk,$ionicSideMenuDelegate) {
debugger;

        $scope.login={
            password:''
        }
        if(!!$window.localStorage.getItem('password')) {

            $scope.login.password = $window.localStorage.getItem('password');
            $scope.chckStatus = true;
        }


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

        //--------   password Rmember Call  method Start --------//
        $scope.rememberMe=function (login,chckStatus) {
            if(!!chckStatus) {
                $window.localStorage.setItem("password", login.password);
            }
            else {
                $window.localStorage.removeItem('password');
            }
        };
        //----   password Rmember Call  method End  ---//

        //----   password Call  method  ---//

        $scope.passwordCall= function(login){
            debugger;
            login.accountType=$localStorage.accountType;
            /*login.deviceId=$localStorage.deviceId;*/

            var userId= $localStorage.userId;
            if($scope.PasswordForm.$valid) {
            //------     login Service call --------//
                $scope.show($ionicLoading);
            AccountExistsService.loginService(userId,login).then(function(RsltInfo){
                debugger;

            console.log("loginOtp response"+RsltInfo)
                $scope.patientDetails=[];
                $scope.patientDetails = RsltInfo.patientDetails;
                var Getval = RsltInfo.patientDetails;
                var GetRstval = RsltInfo.resultObject;
                var ResltVal = RsltInfo.responseCode;
               
                
                $localStorage.PatientDetails = Getval;

                debugger;


                if(RsltInfo.responseCode == 0){
					$rootScope.actType=RsltInfo.resultObject.accountType;
                    var emailId=RsltInfo.resultObject.emailId;
                    var firstName=RsltInfo.resultObject.firstName;
                    var lastName=RsltInfo.resultObject.lastName;
                    var phoneNumber= $rootScope.account.phoneNumber;
                    var accountType=RsltInfo.resultObject.accountType;
                    var userId=RsltInfo.resultObject.userId;
                    var sessionId = RsltInfo.resultObject.sessionId;

                    $localStorage.emailId = emailId;
                    $localStorage.firstName = firstName;
                    $localStorage.lastName = lastName;
                    $localStorage.phoneNumber = phoneNumber;

                    $localStorage.userId = userId;
                    $localStorage.sessionId = sessionId;
                    $localStorage.accountType = accountType;
                    $scope.hide($ionicLoading);
                    $state.go('app.home');

                }

                else if (RsltInfo.errorMessage =="Please check password"){
				   $scope.hide($ionicLoading);
                    /*$scope.passwordError = RsltInfo.errorMessage;*/
                    /*toaster.pop('error', "", '<ul><li>Please check password</li></ul>', 3000, 'trustedHtml');*/
                    var toast = ({
                        message : 'Please check password',
                        position: 'top',
                        stick: false,
                        timeout: 2000,

                        cssClass: "toast_section_error"
                    });
                    ionicToast.show(toast.message,toast.position,toast.stick,toast.timeout,toast.cssClass);

                }
              /*  else if (RsltInfo.errorMessage =="You are not allowed to access, please contact admin "){
                    $scope.hide($ionicLoading);
                    *//*$scope.passwordError = RsltInfo.errorMessage;*//*
                    *//*toaster.pop('error', "", '<ul><li>Please check password</li></ul>', 3000, 'trustedHtml');*//*
                    ionicToast.show('You are not allowed to access,Please contact admin', 'top', false, 2000);
                }*/

                else{
                    $scope.hide($ionicLoading);
                }

            });
            }
        }



        $scope.forgotPassword= function(){
            debugger;

            var emailId= $rootScope.UserInfo.emailId;
            var phoneNumber= $rootScope.account.phoneNumber;

                $scope.show($ionicLoading);
            forgotService.ForgotPassword(emailId,phoneNumber).then(function(ForgotResponse){
                    debugger;
                    console.log("loginOtp response"+ForgotResponse)
                    var GetRstval = ForgotResponse.resultObject;
                    var ResltVal = ForgotResponse.responseCode;
                    debugger;


                    if(ForgotResponse.responseCode == 0){

                        $scope.hide($ionicLoading);
                        $state.go('app.forgotOtp');

                    }

                   else{
                        $scope.hide($ionicLoading);
                    }

                });

        }




    });