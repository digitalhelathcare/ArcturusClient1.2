angular.module('starter.FeedbackService', ['ngStorage'])

    .factory('FeedbackServiceInfo',function ($http,$localStorage) {
        var webServiceUrl   = $localStorage.serviceURL;
        var config = {
            headers: {'Content-Type': 'application/json; charset=utf-8', 'Authorization': 'homecare1@3'}
        };

        return{

            saveFeedback :  function(feedData){
                debugger;
                var promise = $http.post(webServiceUrl+'saveFeedback',feedData,config) .then(function(response) {
                    debugger;
                    console.log('Response -- '+response.data);
                    return response.data;
                }, function (error) {

                })
                return promise;
            }

        }

    });