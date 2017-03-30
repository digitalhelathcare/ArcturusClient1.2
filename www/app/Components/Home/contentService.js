angular.module('starter.contentService', ['ngStorage'])

    .factory('GetContent',function ($http,$localStorage) {
        var webServiceUrl   = $localStorage.serviceURL;
        var config = {
            headers: {'Content-Type': 'application/json; charset=utf-8', 'Authorization': 'homecare1@3'}
        };

        return{

            getContentService :  function(userId,contentName,sessionId){
                debugger;
                var promise = $http.get(webServiceUrl+'getContentData?userId='+userId+'&contentName='+contentName+'&sessionId='+sessionId,config) .then(function(response) {
                    debugger;
                    console.log('Response -- '+response.data);
                    return response.data;
                }, function (error) {

                })
                return promise;
            }

        }

    });