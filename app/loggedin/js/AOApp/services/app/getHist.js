angular.module('myApp.services')
    //returns a promise from an API call for option chain
    .factory('getHist', ['$http', '$timeout', '$q', function($http, $timeout, $q) {



        //return result; //JavaScript object
       var getData = function(){
        var defer = $q.defer();

        $http({
           method: "GET",
           url: "https://api.bitcoinaverage.com/history/USD/per_day_all_time_history.csv",
           transformResponse: function(data){
             var json = JSON.parse(csvJSON(data));
             return json;
           }
         }).then(function(response){
           defer.resolve(response.data);
         });
         return defer.promise;
       };

       return {
         getData: getData
       }
    }]);


         /*$http({
           method: "POST",
           url: "https://tkeith.com/zds1/public/yahoo/ichart",
           dataType: "json",
           data: {
             "params":
             {
               s: ticker
           }},
           transformResponse: function(data){
             var csv = JSON.parse(data).data;
             //////console.log(googtoJsonStr(issuelist));
             var json = JSON.parse(csvJSON(csv));
             return json;
           }
         })*/
