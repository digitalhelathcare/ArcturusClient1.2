
angular.module('starter.ProfileCtrl', ['ngStorage','toaster','ngAnimate'])

.controller('ProfileCtrl', function($scope, $stateParams,GetProfile,$ionicLoading,toaster,$ionicPopup,$window, $timeout,$rootScope,$localStorage,UpdateProfileService, $state,ionicMaterialMotion, ionicMaterialInk,$ionicSideMenuDelegate) {
        debugger;
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $scope.navTitle='<img class="title-image" src="img/Logo.png" />';
    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();

    $ionicSideMenuDelegate.canDragContent(true);


        $scope.CallTel = function(tel) {
            debugger;
            window.location.href = 'tel:'+ tel;
        }

       debugger;
        $scope.update={
            firstName:'',
            lastName:'',
            emailId:'',
            phoneNumber:'',
            userId:''
        }

        $scope.update.firstName= $localStorage.firstName;
        $scope.firstNameTF=true;
        $scope.readFname=function () {
            debugger;
            $scope.firstNameTF=false;
            $scope.lastNameTF=true;
            $scope.emailIdTF=true;
           /* $scope.shouldBeOpen = true;*/

        };


        $scope.update.lastName=$localStorage.lastName;
        $scope.lastNameTF=true;
    $scope.readLname=function () {
        debugger;
        $scope.lastNameTF=false;
        $scope.firstNameTF=true;
        $scope.emailIdTF=true;
       /* $scope.OpenLastName = true;
        $scope.shouldBeOpen = false;*/
    };
        $scope.update.emailId= $localStorage.emailId;
    $scope.emailIdTF=true;
    $scope.readEmailid=function () {
        debugger;
        $scope.firstNameTF=true;
        $scope.lastNameTF=true;
        $scope.emailIdTF=false;
      /*  $scope.OpenEmail = true;
        $scope.shouldBeOpen = false;*/
    };






        $scope.update.phoneNumber=$localStorage.phoneNumber;



        $scope.show = function() {
            $ionicLoading.show({
                 template: '<ion-spinner icon="android" class="spinner-balanced" ></ion-spinner>'
            });
        };

        $scope.hide = function(){
            $ionicLoading.hide();
        };

        debugger;

        $scope.GetProfileCall= function(){
            debugger;
            var userId    = $localStorage.userId;
            var sessionId = $localStorage.sessionId;

            //----       GetProfile Service  call -----//
            $scope.show($ionicLoading);
            GetProfile.GetProfileService(userId,sessionId).then(function(GetProfileResult){
                debugger;
                console.log("login response:" +GetProfileResult)
                var GetResultVal = GetProfileResult.resultObject;
                var ResultVal = GetProfileResult.responseCode;
                $rootScope.UserInfo= GetProfileResult.resultObject;
                debugger;
                if(GetProfileResult.responseCode == 0){

                    var emailId=GetProfileResult.resultObject.emailId;
                    var firstName=GetProfileResult.resultObject.firstName;
                    var lastName=GetProfileResult.resultObject.lastName;
                    /* var phoneNumber=login.phoneNumber;*/
                    var userId=GetProfileResult.resultObject.userId;
                    $localStorage.emailId = emailId;
                    $localStorage.firstName = firstName;
                    $localStorage.lastName = lastName;
                    /* $localStorage.phoneNumber = phoneNumber;*/
                    $localStorage.userId = userId;
                    $scope.hide($ionicLoading);
                    $state.go('app.profile');
                }
                else if(GetProfileResult.errorMessage =="Session is Expired"){
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

        $scope.GetProfileCall();

        $scope.FirstNameCount = 0;
        $scope.LastNameCount = 0;
        $scope.EmailCount = 0;
        $scope.FirstNameChange = function() {
            debugger;

            $scope.FirstNameCount++;
        };
        $scope.LastNameChange = function() {
            debugger;
            $scope.LastNameCount++;
        };
        $scope.EmailChange = function() {
            debugger;
            $scope.EmailCount++;
        };

        //----   updateProf Call  method  ---//

     /*  else if(FirstNameCount = 0){
                toaster.pop('error', "", '<ul><li>sorry</li></ul>', 3000, 'trustedHtml');

            }
        else if(FirstNameCount = 0){
                toaster.pop('error', "", '<ul><li>sorry</li></ul>', 3000, 'trustedHtml');

            }*/


        $scope.updateProfCall=function(update){
            debugger;


            var  FirstNameCount = $scope.FirstNameCount;
            var  LastNameCount = $scope.LastNameCount;
            var  EmailCount = $scope.EmailCount;
            if((FirstNameCount == 0) && (LastNameCount == 0) && (EmailCount == 0)){
               /* toaster.pop('error', "", '<ul><li>sorry</li></ul>', 3000, 'trustedHtml');
*/
            }
            else {
            update.appId  ="a8edd8e0";
            update.accountType  =$localStorage.accountType;

            update.gender  ="";
            update.photo  ="";
            update.dob  ="";
            update.userId = $localStorage.userId;
            update.sessionId=$localStorage.sessionId;
            $scope.show($ionicLoading);

            //----     UpdateProfile Service call ---------//

            UpdateProfileService.UpdateProfileService(update).then(function(updateResult){
                debugger;
                console.log("login response:" +updateResult)
                var GetResultVal = updateResult.resultObject;
                var ResultVal = updateResult.responseCode;

                debugger;
                if(updateResult.responseCode == 0){
                    var emailId=updateResult.resultObject.emailId;
                    var firstName=updateResult.resultObject.firstName;
                    var lastName=updateResult.resultObject.lastName;
                    var phoneNumber=updateResult.resultObject.phoneNumber;

                    $localStorage.emailId = emailId;
                    $localStorage.firstName = firstName;
                    $localStorage.lastName = lastName;
                   $localStorage.phoneNumber = phoneNumber;

                    $scope.hide($ionicLoading);
                    $scope.FirstNameCount = 0;
                    $scope.LastNameCount = 0;
                    $scope.EmailCount = 0;
                    $scope.firstNameTF=true;
                    $scope.lastNameTF=true;
                    $scope.emailIdTF=true;
                    toaster.pop('success', "", '<ul><li>Updated Successfully</li></ul>', 3000, 'trustedHtml');

                }
                else if(updateResult.errorMessage =="Session is Expired"){
                    $scope.hide($ionicLoading);
                    $scope.showConfirm = function() {
                        debugger;
                       /* var confirmPopup = $ionicPopup.confirm({
                            'title': '',
                            'subTitle': 'Session is Expired',
                            'scope': $scope,
                            'buttons': [
                                {
                                    'text': '',
                                    'type': 'button-block icon-center ion-android-call button-android-call',
                                    'onTap': function(event) {
                                        $window.localStorage.clear();
                                        $state.go('app.login');


                                    }
                                }
                            ]
                        });*/
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

        }


    })