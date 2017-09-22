'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]);


angular.module('myApp.filters').filter('strikeRange', function(){
    return function(items, field, strikes){
      var strikeBeg = 0.90 * strikes;
      var strikeEnd = 1.10 * strikes; // 1 day in ms
      return items.filter(function(item){
        return (item[field] > strikeBeg && item[field] < strikeEnd);
      });
    };
  });


  // Setup the filter
angular.module('myApp.filters').filter('optionName', function() {

  // Create the return function and set the required parameter as well as an optional paramater
  return function(input) {
      // If the input data is not a number, perform the operations to capitalize the correct letter.
      input = input.slice(0,-2);
      return input;
  }
});


angular.module('myApp.filters').filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});

// closed order filters //


angular.module('myApp.filters').filter('closed', function() {

  // Create the return function and set the required parameter as well as an optional paramater
  return function(input) {
      // If the input data is not a number, perform the operations to capitalize the correct letter.
      var closed_price = '$' + parseFloat(input).toFixed(2);
      if (input == "0" || input == "NaN"){
        closed_price = "Market";
      }
      return closed_price;
  }
});
