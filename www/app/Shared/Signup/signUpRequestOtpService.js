angular.module('starter.signUpReq', ['ngStorage'])

    .factory('signUpReqServices',function ($http,$localStorage) {
        var webServiceUrl   = $localStorage.serviceURL;
        var config = {
            headers: {'Content-Type': 'application/json; charset=utf-8', 'Authorization': 'homecare1@3'}
        };

        return{

        requestOTPService :  function(phoneNumber,emailId){
            debugger;
            var promise = $http.get(webServiceUrl+'requestOTP?emailId='+emailId+'&phoneNumber='+phoneNumber.phoneNumber,config) .then(function(response) {
                console.log('Response -- '+response.data);
                return response.data;
            }, function (error) {

            })
            return promise;
        }

        }
    });