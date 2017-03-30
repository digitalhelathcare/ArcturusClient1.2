angular.module('starter.logoutService', ['ngStorage'])

    .factory('hitLogout',function ($http,$localStorage) {
        var webServiceUrl   =  $localStorage.serviceURL;
        var config = {
            headers: {'Content-Type': 'application/json; charset=utf-8', 'Authorization': 'homecare1@3'}
        };

        return{

            userLogoutService :  function(userId,sessionId){
                debugger;
                var promise = $http.get(webServiceUrl+'userLogout?userId='+userId+'&sessionId='+sessionId,config) .then(function(response) {
                    console.log('Response -- '+response.data);
                    return response.data;
                }, function (error) {

                })
                return promise;
            }

        }

    });