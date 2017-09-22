angular.module('myApp.services')
    //returns a promise from an API call for option chain
    .factory('volatilityCalc', ['$q', 'getHist', function($q, getHist) {

      var calculateVolatility = function(range){
        var days = range;

        var defer = $q.defer();
        getHist.getData().then(function(response){
          arrVol = getMonthCloseArr(response, days);
          //console.log(arrVol);
          volatility = calculateVol(arrVol);
          defer.resolve(volatility);
        }).catch(function(){
          alert("unable to retrieve data");
        });
        return defer.promise;
      };

        var calculateVol = function(data) {
          var averageChg = function(data){
            var sum = 0;
            var n = data.length - 1;
            for (var i = 1; i < data.length; i++) {
              sum = sum + Number(data[i].change);
            };
            return sum/n;
          };

          var calculateVar = function(data, mean){
            var sum = 0;
            var n = data.length - 1;
            for (var i = 1; i < data.length; i++) {
              var squaredDev = (data[i].change - mean)*(data[i].change - mean);
              sum = sum + squaredDev;
            };
            return sum/n;
          }

          var mean = averageChg(data);
          var variance = calculateVar(data, mean);

          return Math.sqrt(variance);
        };

        var annualizedVol = function(stdev) {
          return Math.sqrt(365) * stdev;
        };

        var getMonthCloseArr = function(data, days) {
          if (days == null || days == 0) {
            days = 10;
          };
          var dataArr = [];
            for (var i = data.length - 2; i > data.length - days - 3; i--) {

              var j = data.length - 2 - i;
              if (j < 1){
                dataArr.push({
                  date: data[i].datetime,
                  close: Number(data[i].average)
                });
              } else {
                var percentChange = ((data[i].average/dataArr[j-1].close) - 1);

                dataArr.push({
                  date: data[i].datetime,
                  close: Number(data[i].average),
                  change: Number(percentChange)
                });
              }
            }
          return dataArr;
        };


        return {
          calculateVolatility: calculateVolatility
        };
    }]);
