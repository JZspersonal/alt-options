angular.module("myApp.services").factory('getBTCUSD', ['$http', '$q', function($http, $q){

var url = "https://api.itbit.com/v1/markets/XBTUSD/ticker"

var data = $q.defer();
$http.get(url).then(function(response){
  var bid = response.data.bid;
  var ask = response.data.ask;
  var spot = response.data.lastPrice;
  data.resolve({bid: bid, ask: ask, spot: spot});
});

return data.promise;


}])
