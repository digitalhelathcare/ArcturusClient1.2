angular.module('starter.loginPassword', ['ngStorage'])

    .factory('ApiFactory',function ($http,$localStorage) {
        var webServiceUrl   = $localStorage.serviceURL;
        /*var webServiceUrl   = "http://digihealthcare.castusinfo.com/";*/
        var config = {
            headers: {'Content-Type': 'application/json; charset=utf-8', 'Authorization': 'homecare1@3'}
        };

        return{

            IsAccountExist :  function(AccountExist){
                debugger;
                var promise = $http.get(webServiceUrl+'isAccountExists?phoneNumber='+AccountExist.phoneNumber+'&deviceId='+AccountExist.deviceId,config) .then(function(response) {
                    console.log('Response -- '+response.data);
                    return response.data;
                }, function (error) {

                })
                return promise;
            }

        }

    });