angular.module('myApp.services')
.factory("probabilityChart", ['$q', '$window', 'volatilityCalc', function($q, $window, volatilityCalc){

  var getRanges = function(){
    var defer = $q.defer();
        var last = $window.localStorage.getItem("BTCUSD");
        //console.log(last)
        var volatility = volatilityCalc.calculateVolatility();

        volatility.then(function(data){

          //console.log(data);
          var vol = (data*100).toFixed(2);
          var oneStd30 = {
            vol: vol * Math.sqrt(30),
            up: last * (1 + Number(data * Math.sqrt(30) * Math.sqrt(30/252))),
            down: last * (1- Number(data * Math.sqrt(30) * Math.sqrt(30/252)))
          }
          var oneStd60 = {
            vol: vol*Math.sqrt(60),
            up:  Number(last) + Number(last * data * Math.sqrt(60) * Math.sqrt(60/252)),
            down: last - Number(last * data * Math.sqrt(60) * Math.sqrt(60/252))
          }
          var oneStd90 = {
            vol: vol*Math.sqrt(90),
            up:  Number(last) + Number(last * data * Math.sqrt(90) * Math.sqrt(90/252)),
            down: last - Number(last * data * Math.sqrt(90) * Math.sqrt(90/252))
          }
          var twoStd30 = {
            vol: vol * Math.sqrt(30),
            up: last * (1 + 2*Number(data * Math.sqrt(30) * Math.sqrt(30/252))),
            down: last *(1- 2*Number(data * Math.sqrt(30) * Math.sqrt(30/252)))
          }
          var twoStd60 = {
            vol: vol*Math.sqrt(60),
            up:  Number(last) + 2*Number(last * data * Math.sqrt(60) * Math.sqrt(60/252)),
            down: last - 2*Number(last * data * Math.sqrt(60) * Math.sqrt(60/252))
          }
          var twoStd90 = {
            vol: vol*Math.sqrt(90),
            up: Number(last) + 2*Number(last * data * Math.sqrt(90) * Math.sqrt(90/252)),
            down: last - 2*Number(last * data * Math.sqrt(90) * Math.sqrt(90/252))
          }
          var threeStd30 = {
            vol: vol * Math.sqrt(30),
            up: last * (1 + 3*Number(data * Math.sqrt(30) * Math.sqrt(30/252))),
            down: last *(1 - 3*Number(data * Math.sqrt(30) * Math.sqrt(30/252)))
          }
          var threeStd60 = {
            vol: vol*Math.sqrt(60),
            up: Number(last) + 3*Number(last * data * Math.sqrt(60) * Math.sqrt(60/252)),
            down: last - 3*Number(last * data * Math.sqrt(60) * Math.sqrt(60/252))
          }
          var threeStd90 = {
            vol: vol*Math.sqrt(90),
            up:  Number(last) + 3 * Number(last * data * Math.sqrt(90) * Math.sqrt(90/252)),
            down: last - 3*Number(last * data * Math.sqrt(90) * Math.sqrt(90/252))
          }

          var range1 = {
            "thirty": oneStd30,
            "sixty": oneStd60,
            "ninety": oneStd90
          };
          var range2 = {
            "thirty": twoStd30,
            "sixty": twoStd60,
            "ninety": twoStd90
          };
          var range3 = {
            "thirty": threeStd30,
            "sixty": threeStd60,
            "ninety": threeStd90
          };
          var rangeArr = []
          rangeArr.push(range1);
          rangeArr.push(range2);
          rangeArr.push(range3);
          defer.resolve(rangeArr);
        });
    return defer.promise;
  }


  return {
    getRanges: getRanges
  };
}]);
