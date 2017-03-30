/**
 * Created by Darshan on 1/24/2017.
 */

angular.module('starter.loginctrl', ['ngStorage','toaster','ngAnimate'])
.controller('LoginCtrl', function($scope, ionicToast,$timeout,$rootScope,$ionicLoading,toaster,signUpReqServices, $stateParams,$localStorage, $state,ApiFactory,ionicMaterialInk,$ionicSideMenuDelegate) {


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

    $ionicSideMenuDelegate.canDragContent(false)

        $scope.show = function() {
            $ionicLoading.show({
                template: '<ion-spinner icon="android" class="spinner-balanced" ></ion-spinner>'
            });
        };

        $scope.hide = function(){
            $ionicLoading.hide();
        };

        //--login call method ---//

        $scope.LoginCall= function(AccountExist){
            $rootScope.account= AccountExist;
            AccountExist.deviceId=$localStorage.deviceId;

            debugger;
            if($scope.LoginForm.$valid) {
            console.log("login input values:" +AccountExist)
            $scope.show($ionicLoading);

                //---isAccountExit service call---//

                ApiFactory.IsAccountExist(AccountExist).then(function(GetResult){


                debugger;
             console.log("login response:" +GetResult)
                var GetResultVal = GetResult.resultObject;
               /* var GetResulVal = GetResult.resultObject.password;*/
                var ResultVal = GetResult.responseCode;
                 $rootScope.UserInfo= GetResult.resultObject;
                debugger;
                if((GetResult.responseCode == 0) && (GetResult.resultObject.password == "Y")){

                    var emailId=GetResult.resultObject.emailId;
                    var firstName=GetResult.resultObject.firstName;
                    var lastName=GetResult.resultObject.lastName;
                    var phoneNumber=AccountExist.phoneNumber;
                    var userId=GetResult.resultObject.userId;
                    var accountType=GetResult.resultObject.accountType;
                    $localStorage.emailId = emailId;
                    $localStorage.firstName = firstName;
                    $localStorage.lastName = lastName;
                    $localStorage.phoneNumber = phoneNumber;
                    $localStorage.userId = userId;
                    $localStorage.accountType = accountType;

                    $scope.hide($ionicLoading);
                    $state.go('app.password');
                }
             else  if((GetResult.responseCode == 0) && (GetResult.resultObject.password == "N")){

                         var emailId=GetResult.resultObject.emailId;
                         var firstName=GetResult.resultObject.firstName;
                         var lastName=GetResult.resultObject.lastName;
                         var phoneNumber=AccountExist.phoneNumber;
                         var userId=GetResult.resultObject.userId;
                         var accountType=GetResult.resultObject.accountType;
                         $localStorage.emailId = emailId;
                         $localStorage.firstName = firstName;
                         $localStorage.lastName = lastName;
                         $localStorage.phoneNumber = phoneNumber;
                         $localStorage.userId = userId;
                         $localStorage.accountType = accountType;

                    var phoneNumber = $rootScope.account;
                    if($localStorage.accountType == "P"){
                        var emailId =$localStorage.emailId;
                    }
                    else if($localStorage.accountType == "F"){
                        var emailId ="arcuturs@gmail.com";
                    }

                   /* var deviceId = $localStorage.deviceId;*/

                    signUpReqServices.requestOTPService(phoneNumber,emailId).then(function(GetRsltInfo){
                        debugger;
                        console.log("signUp response"+GetRsltInfo)
                        var GetRstval = GetRsltInfo.resultObject;
                        var ResltVal = GetRsltInfo.responseCode;
                        debugger;
                        if(GetRsltInfo.responseCode == 0){
                            $scope.hide($ionicLoading);
                            $state.go('app.signUpOtp');
                        }
                        else if((GetRsltInfo.responseCode == 1) && (GetRsltInfo.errorMessage =="Please check phone number")){
                            $scope.hide($ionicLoading);
                            /*  toaster.pop('error', "", '<ul><li>Please check phone number</li></ul>', 3000, 'trustedHtml');*/
                            var toast = ({
                                message : 'Please check phone number',
                                position: 'top',
                                stick: false,
                                timeout: 2000,

                                cssClass: "toast_section_error"
                            });
                            ionicToast.show(toast.message,toast.position,toast.stick,toast.timeout,toast.cssClass);

                        }
                        else if((GetRsltInfo.responseCode == 1) && (GetRsltInfo.errorMessage =="SMS Server issue, Please try later")){
                            $scope.hide($ionicLoading);
                            /* toaster.pop('error', "", '<ul><li>SMS Server issue, Please try later</li></ul>', 3000, 'trustedHtml');*/
                            var toast = ({
                                message : 'SMS server issue, Please try later',
                                position: 'top',
                                stick: false,
                                timeout: 2000,

                                cssClass: "toast_section_error"
                            });
                            ionicToast.show(toast.message,toast.position,toast.stick,toast.timeout,toast.cssClass);

                        }
                      /*  else if ((GetRsltInfo.responseCode == 1) &&(GetRsltInfo.errorMessage =="You are not allowed to access, please contact admin ")){
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


                else if((GetResult.responseCode == 1) && (GetResult.errorMessage == "Account does not exist, please contact admin")){
                        debugger;
                    $scope.hide($ionicLoading);
                    var toast = ({
                        message : 'Account does not exist, please contact admin',
                        position: 'top',
                        stick: false,
                        timeout: 2000,

                        cssClass: "toast_section_error"
                    });
                         ionicToast.show(toast.message,toast.position,toast.stick,toast.timeout,toast.cssClass);
                         }

                else if ((GetResult.responseCode == 1) &&(GetResult.errorMessage =="You are not allowed to access, please contact admin ")){
                    $scope.hide($ionicLoading);
                    debugger;
                    var toast = ({
                        message : 'You are not allowed to access,Please contact admin',
                        position: 'top',
                        stick: false,
                        timeout: 2000,
                        cssClass: "successError"
                    });
                    ionicToast.show(toast.message,toast.position,toast.stick,toast.timeout,toast.cssClass);
                }


                 else{
                            $scope.hide($ionicLoading);
                        }




            });

        }
        }






    }
)

    .controller('autologinCtrl', ['$scope','$state','$localStorage','$ionicHistory','SessionService','$cordovaSplashscreen','ionicToast',
        function ($scope,$state,$localStorage,$ionicHistory,SessionService,$cordovaSplashscreen,ionicToast) {
                  debugger;


            var userId=$localStorage.userId;
            var sessionId=$localStorage.sessionId;
		   $localStorage.serviceURL = "http://digitest.castusinfo.com/";
		 $state.go('app.splash');
            if(userId != undefined && sessionId!=undefined  )
            {
                $ionicHistory.nextViewOptions({
                    historyRoot: true
                });
                
               //---      Session Service call  ----//
               SessionService.checkSessionService(userId,sessionId).then(function(sessionInfo){
                   
                    var ResltVal = sessionInfo.responseCode;
                    if(sessionInfo.responseCode == 0){
					
                        $state.go('app.home');
						$cordovaSplashscreen.hide();
                    }

                   else{
					    
                        $state.go('app.login');
						 $cordovaSplashscreen.hide();
                    }
                });

            }
            else
            {
				//$cordovaSplashscreen.hide();
                $state.go('app.login');
				
				 
            }

        }])

