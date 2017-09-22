angular.module('myApp.services').factory('blackScholes', function(){

  /**
   * Black-Scholes option pricing formula.
   * See {@link http://en.wikipedia.org/wiki/Black%E2%80%93Scholes_model#Black-Scholes_formula|Wikipedia page}
   * for pricing puts in addition to calls.
   *
   * @param   {Number} s       Current price of the underlying
   * @param   {Number} k       Strike price
   * @param   {Number} t       Time to experation in years
   * @param   {Number} v       Volatility as a decimal
   * @param   {Number} r       Annual risk-free interest rate as a decimal
   * @param   {String} callPut The type of option to be priced - "call" or "put"
   * @returns {Number}         Price of the option
   */

  var getPriceBS = function(s, k, t, v, r, callPut) {
    var price = null;
    var w = (r * t + Math.pow(v, 2) * t / 2 - Math.log(k / s)) / (v * Math.sqrt(t));
    if(callPut === "call")
    {
      price = s * stdNormCDF(w) - k * Math.pow(Math.E, -1 * r * t) * stdNormCDF(w - v * Math.sqrt(t));
    }
    else // put
    {
      price = k * Math.pow(Math.E, -1 * r * t) * stdNormCDF(v * Math.sqrt(t) - w) - s * stdNormCDF(-w);
    }
    return price;
  };

  /**
   * Double factorial.  See {@link http://en.wikipedia.org/wiki/Double_factorial|Wikipedia page}.
   * @private
   *
   * @param {Number} n The number to calculate the double factorial of
   * @returns {Number} The double factorial of n
   */

  var _doubleFactorial = function(n) {

    var val = 1;
    for(var i = n; i > 1; i-=2)
    {
      val *= i;
    }
    return val;
  };

  /**
   * Standard normal cumulative distribution function.  The probability is estimated
   * by expanding the CDF into a series using the first 100 terms.
   * See {@link http://en.wikipedia.org/wiki/Normal_distribution#Cumulative_distribution_function|Wikipedia page}.
   *
   * @param {Number} x The upper bound to integrate over.  This is P{Z <= x} where Z is a standard normal random variable.
   * @returns {Number} The probability that a standard normal random variable will be less than or equal to x
   */

  var stdNormCDF = function(x) {
    var probability = 0;
    // avoid divergence in the series which happens around +/-8 when summing the
    // first 100 terms
    if(x >= 8)
    {
      probability = 1;
    }
    else if(x <= -8)
    {
      probability = 0;
    }
    else
    {
      for(var i = 0; i < 100; i++)
      {
        probability += (Math.pow(x, 2*i+1)/_doubleFactorial(2*i+1));
      }
      probability *= Math.pow(Math.E, -0.5*Math.pow(x, 2));
      probability /= Math.sqrt(2*Math.PI);
      probability += 0.5;
    }
    return probability;
  };

  function getImpliedVolatility(expectedCost, s, k, t, r, callPut, estimate){
    estimate = estimate || .1;
    var low = 0;
    var high = Infinity;
    // perform 100 iterations max
    for(var i = 0; i < 100; i++)
    {
      var actualCost = getPriceBS(s, k, t, estimate, r, callPut);
      // compare the price down to the cent
      if(expectedCost * 100 == Math.floor(actualCost * 100))
      {
        break;
      }
      else if(actualCost > expectedCost)
      {
        high = estimate;
        estimate = (estimate - low) / 2 + low
      }
      else
      {
        low = estimate;
        estimate = (high - estimate) / 2 + estimate;
        if(!isFinite(estimate)) estimate = low * 2;
      }
    }
    return estimate;
  };

return {
  priceBS: function(s, k, t, v, r, callPut){
    return getPriceBS(s, k, t, v, r, callPut);
  },
  impliedVOL: function(expectedCost, s, k, t, r, callPut, estimate){
    return getImpliedVolatility(expectedCost, s, k, t, r, callPut, estimate);

  }
}
});
