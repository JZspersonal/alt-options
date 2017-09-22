angular.module("myApp.services").factory('optionChain', ['$q','AOapi', function($q, AOapi){

var service = {};

service.getOptionChain = getOptionChain;


return service;

function getOptionChain(data){
    var defer = $q.defer()
    AOapi.Product.getOptions(data).then(function(response){

      var optionChain = {};
      optionChain.calls = response.data.calls;
      optionChain.puts = response.data.puts;
      defer.resolve(optionChain);
    });
    return defer.promise;
  }
}]);
