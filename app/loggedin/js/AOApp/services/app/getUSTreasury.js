angular.module('myApp.services').factory('getUSTreasury', ['$http', '$q', function($http, $q){

  var interest = $q.defer();

  $http({
     method: "POST",
     url: "https://aos-v3.alt-options.com/public/DTB1YR",
     data: {
     },
     transformResponse: function(data){
       var json = JSON.parse(csvJSON(JSON.parse(data).data));
       return json;
     }
   }).then(function(response){
     interest.resolve(response.data[response.data.length-2]);
   });
   return interest.promise



}]);
