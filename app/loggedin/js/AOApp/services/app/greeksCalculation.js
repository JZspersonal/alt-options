angular.module("myApp.services").factory('greekTable', function(){
  /**
   * Standard normal density function.
   *
   * @private
   * @param {Number} x The value to calculate the standard normal density of
   * @returns {Number} The value of the standard normal density function at x
   */

   var _doubleFactorial = function(n) {

     var val = 1;
     for(var i = n; i > 1; i-=2)
     {
       val *= i;
     }
     return val;
   };


  var _stdNormDensity = function(x)
  {
    return Math.pow(Math.E, -1 * Math.pow(x, 2) / 2) / Math.sqrt(2 * Math.PI);
  }

  /**
   * Calculates the delta of an option.
   *
   * @param {Number} s Current price of the underlying
   * @param {Number} k Strike price
   * @param {Number} t Time to experiation in years
   * @param {Number} v Volatility as a decimal
   * @param {Number} r Anual risk-free interest rate as a decimal
   * @param {String} callPut The type of option - "call" or "put"
   * @returns {Number} The delta of the option
   */

  var getDelta = function(s, k, t, v, r, callPut)
  {
    if(callPut === "call")
    {
      return _callDelta(s, k, t, v, r);
    }
    else // put
    {
      return _putDelta(s, k, t, v, r);
    }
  }

  /**
   * Calculates the delta of a call option.
   *
   * @private
   * @param {Number} s Current price of the underlying
   * @param {Number} k Strike price
   * @param {Number} t Time to experiation in years
   * @param {Number} v Volatility as a decimal
   * @param {Number} r Anual risk-free interest rate as a decimal
   * @returns {Number} The delta of the call option
   */
  var _callDelta = function(s, k, t, v, r)
  {
    var w = getW(s, k, t, v, r);
    var delta = null;
    if(!isFinite(w))
    {
      delta = (s > k) ? 1 : 0;
    }
    else
    {
      delta = stdNormCDF(w);
    }
    return delta;
  }

  /**
   * Calculates the delta of a put option.
   *
   * @private
   * @param {Number} s Current price of the underlying
   * @param {Number} k Strike price
   * @param {Number} t Time to experiation in years
   * @param {Number} v Volatility as a decimal
   * @param {Number} r Anual risk-free interest rate as a decimal
   * @returns {Number} The delta of the put option
   */
  var _putDelta = function(s, k, t, v, r)
  {
    var delta = _callDelta(s, k, t, v, r) - 1;
    return (delta == -1 && k == s) ? 0 : delta;
  }

  /**
   * Calculates the rho of an option.
   *
   * @param {Number} s Current price of the underlying
   * @param {Number} k Strike price
   * @param {Number} t Time to experiation in years
   * @param {Number} v Volatility as a decimal
   * @param {Number} r Anual risk-free interest rate as a decimal
   * @param {String} callPut The type of option - "call" or "put"
   * @param {String} [scale=100] The value to scale rho by (100=100BPS=1%, 10000=1BPS=.01%)
   * @returns {Number} The rho of the option
   */
  var getRho = function(s, k, t, v, r, callPut, scale)
  {
    scale = scale || 100;
    if(callPut === "call")
    {
      return _callRho(s, k, t, v, r) / scale;
    }
    else // put
    {
      return _putRho(s, k, t, v, r) / scale;
    }
  }

  /**
   * Calculates the rho of a call option.
   *
   * @private
   * @param {Number} s Current price of the underlying
   * @param {Number} k Strike price
   * @param {Number} t Time to experiation in years
   * @param {Number} v Volatility as a decimal
   * @param {Number} r Anual risk-free interest rate as a decimal
   * @returns {Number} The rho of the call option
   */
  var _callRho = function(s, k, t, v, r)
  {
    var w = getW(s, k, t, v, r);
    if(!isNaN(w))
    {
      return k * t * Math.pow(Math.E, -1 * r * t) * stdNormCDF(w - v * Math.sqrt(t));
    }
    else
    {
      return 0;
    }
  }

  /**
   * Calculates the rho of a put option.
   *
   * @private
   * @param {Number} s Current price of the underlying
   * @param {Number} k Strike price
   * @param {Number} t Time to experiation in years
   * @param {Number} v Volatility as a decimal
   * @param {Number} r Anual risk-free interest rate as a decimal
   * @returns {Number} The rho of the put option
   */
  var _putRho = function(s, k, t, v, r)
  {
    var w = getW(s, k, t, v, r);
    if(!isNaN(w))
    {
      return -1 * k * t * Math.pow(Math.E, -1 * r * t) * stdNormCDF(v * Math.sqrt(t) - w);
    }
    else
    {
      return 0;
    }
  }

  /**
   * Calculates the vega of a call and put option.
   *
   * @param {Number} s Current price of the underlying
   * @param {Number} k Strike price
   * @param {Number} t Time to experiation in years
   * @param {Number} v Volatility as a decimal
   * @param {Number} r Anual risk-free interest rate as a decimal
   * @returns {Number} The vega of the option
   */
  var getVega = function(s, k, t, v, r)
  {
    var w = getW(s, k, t, v, r);
    return (isFinite(w)) ? (s * Math.sqrt(t) * _stdNormDensity(w) / 100) : 0;
  }

  /**
   * Calculates the theta of an option.
   *
   * @param {Number} s Current price of the underlying
   * @param {Number} k Strike price
   * @param {Number} t Time to experiation in years
   * @param {Number} v Volatility as a decimal
   * @param {Number} r Anual risk-free interest rate as a decimal
   * @param {String} callPut The type of option - "call" or "put"
   * @param {String} [scale=365] The number of days to scale theta by - usually 365 or 252
   * @returns {Number} The theta of the option
   */
  var getTheta = function(s, k, t, v, r, callPut, scale)
  {
    scale = scale || 365;
    if(callPut === "call")
    {
      return _callTheta(s, k, t, v, r) / scale;
    }
    else // put
    {
      return _putTheta(s, k, t, v, r) / scale;
    }
  }

  /**
   * Calculates the theta of a call option.
   *
   * @private
   * @param {Number} s Current price of the underlying
   * @param {Number} k Strike price
   * @param {Number} t Time to experiation in years
   * @param {Number} v Volatility as a decimal
   * @param {Number} r Anual risk-free interest rate as a decimal
   * @returns {Number} The theta of the call option
   */
  var _callTheta = function(s, k, t, v, r)
  {
    var w = getW(s, k, t, v, r);
    if(isFinite(w))
    {
      return -1 * v * s * _stdNormDensity(w) / (2 * Math.sqrt(t)) - k * r * Math.pow(Math.E, -1 * r * t) * stdNormCDF(w - v * Math.sqrt(t));
    }
    else
    {
      return 0;
    }
  }

  /**
   * Calculates the theta of a put option.
   *
   * @private
   * @param {Number} s Current price of the underlying
   * @param {Number} k Strike price
   * @param {Number} t Time to experiation in years
   * @param {Number} v Volatility as a decimal
   * @param {Number} r Anual risk-free interest rate as a decimal
   * @returns {Number} The theta of the put option
   */
  var _putTheta = function(s, k, t, v, r)
  {
    var w = getW(s, k, t, v, r);
    if(isFinite(w))
    {
      return -1 * v * s * _stdNormDensity(w) / (2 * Math.sqrt(t)) + k * r * Math.pow(Math.E, -1 * r * t) * stdNormCDF(v * Math.sqrt(t) - w);
    }
    else
    {
      return 0;
    }
  }

  /**
   * Calculates the gamma of a call and put option.
   *
   * @param {Number} s Current price of the underlying
   * @param {Number} k Strike price
   * @param {Number} t Time to experiation in years
   * @param {Number} v Volatility as a decimal
   * @param {Number} r Anual risk-free interest rate as a decimal
   * @returns {Number} The gamma of the option
   */
  var getGamma = function(s, k, t, v, r)
  {
    var w = getW(s, k, t, v, r);
    return (isFinite(w)) ? (_stdNormDensity(w) / (s * v * Math.sqrt(t))) : 0;
  }

  function getW(s, k, t, v, r)
  {
    var w = (r * t + Math.pow(v, 2) * t / 2 - Math.log(k / s)) / (v * Math.sqrt(t));
    return w;
  }

  var stdNormCDF = function(x)
  {
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
  }

return {
  delta: function(s, k, t, v, r, callPut) {
    return getDelta(s, k, t, v, r, callPut);
  },
  vega: function(s, k, t, v, r) {
    return getVega(s, k, t, v, r);
  },
  theta: function(s, k, t, v, r, callPut) {
    return getTheta(s, k, t, v, r, callPut);
  },
  gamma: function(s, k, t, v, r) {
    return getGamma(s, k, t, v, r);
  },
  omega: function(s, k, t, v, r) {
    return getW(s, k, t, v, r);
  },
  rho: function(s, k, t, v, r) {
    return getRho(s, k, t, v, r);
  }
}

});
