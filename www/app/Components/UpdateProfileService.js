angular.module('starter.UpdateProfileService', ['ngStorage'])

    .factory('UpdateProfileService',function ($http,$localStorage) {
        var webServiceUrl   = $localStorage.serviceURL;
        var config = {
            headers: {'Content-Type': 'application/json; charset=utf-8', 'Authorization': 'homecare1@3'}
        };

        return{

            UpdateProfileService :  function(update){
                debugger;
                var promise = $http.post(webServiceUrl+'updateProfile',update,config) .then(function(response) {
                    debugger;
                    console.log('Response -- '+response.data);
                    return response.data;
                }, function (error) {

                })
                return promise;
            }

        }

    });