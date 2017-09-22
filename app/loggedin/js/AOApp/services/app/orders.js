angular.module('myApp.services').factory('orders', ["AOapi", "$q", function(AOapi, $q){
var service = {};

service.getOrders = getOrderBook;

return service;


function getOrderBook() {

  var openOrders = [];
  var closedOrders = [];
  var rejectedPositions = [];
  var positions = [];

  var promiseOpenOrders = AOapi.Account.getOpenOrders();
  var promiseClosedOrders = AOapi.Account.getClosedOrders();
  var promiseRejectedPositions = AOapi.Account.getRejectedOrders();
  var promisePositions = AOapi.Account.getPositions();

  var promises = [promiseOpenOrders, promiseClosedOrders, promiseRejectedPositions, promisePositions];
  var defer = $q.defer();

  $q.all(promises).then(function(values){
    openOrders = values[0].data.orders;
    closedOrders = values[1].data.orders;
    rejectedPositions = values[2].data.orders;
    positions = values[3].data.positions;

    var orderBook = {
      open: openOrders,
      closed: closedOrders,
      rejected: rejectedPositions,
      positions: positions
    };

    defer.resolve(orderBook);

  });

  return defer.promise;

};

}]);
