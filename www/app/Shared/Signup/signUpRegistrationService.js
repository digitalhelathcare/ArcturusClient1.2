angular.module('starter.signUpRegistration', ['ngStorage'])

    .factory('registrationServices',function ($http,$localStorage) {
        var webServiceUrl   = $localStorage.serviceURL;
        var config = {
            headers: {'Content-Type': 'application/json; charset=utf-8', 'Authorization': 'homecare1@3'}
        };

        return{

            registrationService :  function(register){
                debugger;
                var promise = $http.post(webServiceUrl+'registration',register,config) .then(function(response) {
                    debugger;
                    console.log('Response -- '+response.data);
                    return response.data;
                }, function (error) {

                })
                return promise;
            }

        }

    });