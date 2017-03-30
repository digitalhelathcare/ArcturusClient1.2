angular.module('starter.validateOtp', ['ngStorage'])

    .factory('commonServices',function ($http,$localStorage) {
        var webServiceUrl   = $localStorage.serviceURL;
        var config = {
            headers: {'Content-Type': 'application/json; charset=utf-8', 'Authorization': 'homecare1@3'}
        };

        return{

            validateOTPService :  function(phoneNumber,email,validateOTP){
                debugger;
                var promise = $http.get(webServiceUrl+'validateOTP?phoneNumber='+phoneNumber.phoneNumber+'&emailId='+email+'&otp='+validateOTP.otp,config) .then(function(response) {
                    console.log('Response -- '+response.data);
                    return response.data;
                }, function (error) {

                })
                return promise;
            }

        }


    });