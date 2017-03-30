angular.module('starter.updatePasswordService', ['ngStorage'])

    .factory('updatePasswordService',function ($http,$localStorage) {
        var webServiceUrl   = $localStorage.serviceURL;
        /*var webServiceUrl   = "http://digihealthcare.castusinfo.com/";*/
        var config = {
            headers: {'Content-Type': 'application/json; charset=utf-8', 'Authorization': 'homecare1@3'}
        };

        return{


            UpdatePassword :  function(userId,password){
                debugger;
                var promise = $http.get(webServiceUrl+'updatePassword?userId='+userId+'&password='+password.password,config) .then(function(response) {
                    console.log('Response -- '+response.data);
                    return response.data;
                }, function (error) {

                })
                return promise;
            }




        }




    });