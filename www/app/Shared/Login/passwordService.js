angular.module('starter.AccountExists', ['ngStorage'])

    .factory('AccountExistsService',function ($http,$localStorage) {
        var webServiceUrl   = $localStorage.serviceURL;
        /*var webServiceUrl   = "http://digihealthcare.castusinfo.com/";*/
        var config = {
            headers: {'Content-Type': 'application/json; charset=utf-8', 'Authorization': 'homecare1@3'}
        };

        return{

            loginService :  function(userId,login){
                debugger;
                var promise = $http.get(webServiceUrl+'loginService?userId='+userId+'&password='+login.password+'&accountType='+login.accountType,config) .then(function(response) {
                    console.log('Response -- '+response.data);
                    return response.data;
                }, function (error) {

                })
                return promise;
            }


        }




    });