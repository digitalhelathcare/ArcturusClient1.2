

angular.module('starter.Profilecontrollers', ['ngStorage','toaster','ngAnimate'])
    .controller('SaveProfileCtrl', function($scope,ionicToast, $timeout,$localStorage,toaster,registrationServices,$ionicLoading,$state,$rootScope,$ionicPush, $stateParams, ionicMaterialInk,$ionicSideMenuDelegate) {

        if($localStorage.accountType == "P"){
        $scope.firstNameEn = true;
        $scope.lastNameEn = true;
        $scope.emailEn = true;
        }

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

      $scope.SaveProfile= {
          firstName: '',
          lastName: '',
          phoneNumber: '',
          emailId: '',
          password: '',
          password_c: ''

      }

        $scope.SaveProfile.phoneNumber=$localStorage.PhoneNumber.phoneNumber;
        $scope.SaveProfile.firstName=$localStorage.firstName;
        $scope.SaveProfile.lastName=$localStorage.lastName;
        $scope.SaveProfile.emailId=$localStorage.emailId;



        $scope.SaveProfileData= function(SaveProfile){
            debugger;

            if($scope.SignUpForm.email.$error.email){

               /* toaster.pop('error', "", '<ul><li>This email format is invalid!</li></ul>', 3000, 'trustedHtml');*/
                var toast = ({
                    message : 'This email format is invalid',
                    position: 'top',
                    stick: false,
                    timeout: 2000,

                    cssClass: "toast_section_error"
                });
                ionicToast.show(toast.message,toast.position,toast.stick,toast.timeout,toast.cssClass);



            }
            if($scope.SignUpForm.password_c.$error.nxEqualEx){

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


            if($scope.SignUpForm.$valid) {

                SaveProfile.appId="a8edd8e0";
                SaveProfile.userId=$localStorage.userId;
                SaveProfile.accountType=$localStorage.accountType;

                SaveProfile.gender="";
                SaveProfile.photo="";
                SaveProfile.dob="";
                SaveProfile.deviceType=$localStorage.deviceType;
                SaveProfile.deviceId=$localStorage.deviceId;
                SaveProfile.deviceToken="123";
                SaveProfile.status="y";


                $rootScope.regInfo=  SaveProfile;
                console.log("signUp input values"+SaveProfile)
                $scope.show($ionicLoading);

                //---------    registration Service call -------//

            registrationServices.registrationService(SaveProfile).then(function(resultData){
                debugger;
                console.log("registration response"+resultData)

                $scope.patientDetails=[];
                $scope.patientDetails = resultData.patientDetails;

                var Getval = resultData.patientDetails;


                $localStorage.PatientDetails = Getval;

                if(resultData.responseCode == 0){

                    var emailId=resultData.resultObject.emailId;
                    var firstName=resultData.resultObject.firstName;
                    var lastName=resultData.resultObject.lastName;
                    var phoneNumber= $rootScope.regInfo.phoneNumber;

                    var userId=resultData.resultObject.userId;
                    var sessionId = resultData.resultObject.sessionId;

                    $localStorage.emailId = emailId;
                    $localStorage.firstName = firstName;
                    $localStorage.lastName = lastName;
                    $localStorage.phoneNumber = phoneNumber;

                    $localStorage.userId = userId;
                    $localStorage.sessionId = sessionId;
                    $scope.hide($ionicLoading);
                    $state.go('app.home');
                }
                else{

                }

            });

            }

        }

    })


