angular.module('myApp.services').factory('normDistPrice', ['volatilityCalc', '$q', function(volatilityCalc, $q){

  var service = {};

  service.getPoints = getPoints;

  return service;

  //probability density normal distribution function
  function getPoints(price, days){

    var pdf = function(std) {
      var pi = 3.14;
      var e = 2.718;

      var pdf = (1/Math.sqrt(2*pi))*Math.pow(e, -(Math.pow(std, 2)/2));

      return pdf;
    };

    //return standardized deviation
    var standardize = function(spot, mean, vol){
      return (spot - mean)/vol;
    };

    var defer = $q.defer();
    var promise = volatilityCalc.calculateVolatility(30);
    promise.then(function(data){
      var points = [];
      var vol = data * 100 * Math.sqrt(days);
      var x;
      var step;
      if (days == 90) {
        x = price - 3.5 * Number(price * data * Math.sqrt(days) * Math.sqrt(days/365));

        step  = (7/100) * Number(price * data * Math.sqrt(days) * Math.sqrt(days/365));
      } else if (days == 60) {
        x = price - 3.5 * Number(price * data * Math.sqrt(days) * Math.sqrt(days/365));

        step  = (7/100) * Number(price * data * Math.sqrt(days) * Math.sqrt(days/365));

      } else {
        x = price - 3.5 * Number(price * data * Math.sqrt(days) * Math.sqrt(days/365));

        step  = (7/100) * Number(price * data * Math.sqrt(days) * Math.sqrt(days/365));
      }

      for (var i = 0; i < 101; i++){
        var nextX = x + step * i;
        var standard = standardize(nextX, price, vol);
        var density = pdf(standard);
        points.push({
          x: nextX,
          y: density //*10000000000000
        });
      };
      defer.resolve(points);
    })
    return defer.promise;
  };

}]);
