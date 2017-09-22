angular.module("myApp.services").factory("greeks", ['$window', 'greekTable', function($window, greekTable){
  var service = {};

  service.getGreeks = getGreeks;
  return service;

  function getGreeks(positions){

    var getTerm = function(year,month,day) {
      var currentDate = new Date();
      var expDate = new Date(year,month,day);
      var term = Math.abs((expDate - currentDate)/(1000 * 60 * 60 * 24 * 365));
      // console.log(term);
      return term;
    }

    var greekArr = [];
    for (var i = 0; i < positions.length; i++) {
      var type;
      var strike;
      if (positions[i].symbol.indexOf("Call") > 0) {
        type = "call";
        strike = Number(positions[i].symbol.substring(0, positions[i].symbol.length - 10));
      } else if (positions[i].symbol.indexOf("Put") > 0) {
        type = "put";
        strike = Number(positions[i].symbol.substring(0, positions[i].symbol.length - 9));
      } else {
        type = "XBT";
      };
        var expiration = String(positions[i].symbol.substring(positions[i].symbol.length - 4, positions[i].symbol.length));

        var underlying = Number($window.localStorage.getItem("BTCUSD"));
        var term = getTerm(2016, Number(expiration.substring(0, 2)), Number(expiration.substring(2, expiration.length)));
        //console.log(expiration,strike,underlying,term);
        var volatility = 0.85;
        var interest = 0.05;
        var amount = Number(positions[i].amount);
        if (type == "XBT") {
          greekArr.push({
            asset: positions[i].symbol,
            delta: 1 * amount,
            gamma: 0,
            vega: 0,
            theta: 0
          });
        } else {
          greekArr.push({
            asset: positions[i].symbol,
            delta: greekTable.delta(underlying, strike, term, volatility, interest, type)*amount,
            gamma: greekTable.gamma(underlying, strike, term, volatility, interest)*amount,
            vega: greekTable.vega(underlying, strike, term, volatility, interest)*amount,
            theta: greekTable.theta(underlying, strike, term, volatility, interest, type)*amount
          });
        }
    };
    return greekArr;
  };


}]);
