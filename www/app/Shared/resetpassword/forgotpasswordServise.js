angular.module('starter.forgotService', ['ngStorage'])

    .factory('forgotService',function ($http,$localStorage) {
        var webServiceUrl   = $localStorage.serviceURL;
        /*var webServiceUrl   = "http://digihealthcare.castusinfo.com/";*/
        var config = {
            headers: {'Content-Type': 'application/json; charset=utf-8', 'Authorization': 'homecare1@3'}
        };

        return{


            ForgotPassword :  function(emailId,phoneNumber){
                debugger;
                var promise = $http.get(webServiceUrl+'forgotPassword?emailId='+emailId+'&phoneNumber='+phoneNumber,config) .then(function(response) {
                    console.log('Response -- '+response.data);
                    return response.data;
                }, function (error) {

                })
                return promise;
            }




        }




    });