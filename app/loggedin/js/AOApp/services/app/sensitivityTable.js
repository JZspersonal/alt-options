
angular.module('myApp.services')
.factory("sensitivityTable", ['blackScholes','$window', function(blackScholes, $window){

  var sensitivityTable = function(positions) {

    var date = new Date();

    var zeroTermChart = []; //zero term for charting

    this.posList = positions,

    this.spot = $window.localStorage.getItem('BTCUSD'),

    this.vol = $window.localStorage.getItem('btcVol') * Math.sqrt(365),

    this.interest = $window.localStorage.getItem('Interest');

    this.TDArr = new Array(21);
    for (var i = 0; i <= 20; i++) {
     this.TDArr[i] = new Array(10);
    };  //create the structure.

    for (var j = 0; j < this.posList.products.length; j++) {

      var name = this.posList.products[j].name;
      var premium = (Number(this.posList.products[j].ask) + Number(this.posList.products[j].bid)) / 2;

      if (premium == Number(this.posList.products[j].ask)/2) {
        premium = premium * 2 - 0.1;
      }

      if (premium == Number(this.posList.products[j].bid)/2) {
        premium == premium * 2 + 0.1;
      }

      var count = Number(this.posList.products[j].amount);


      var currentTerm = getTerm(this.posList.products[j].expiration);

      if (j == 0) {

        if (this.posList.products[j].type == 'XBT'){
          //alert("XBT");
          for (var i = 0; i <= 9; i++) {
            var nterm = Number(currentTerm) - i/365
            if (nterm <= 0){
              nterm = .00000001;
            }

            for (var y = 0; y < 21; y++) {
              var spot = Number(this.spot) * 1.25;
              var delta = y * this.spot * 0.025;
              var nspot = spot - delta;
              if (i == 0) {
                var zerospot = Number(this.spot) * 0.75;
                var zerodelta = y * this.spot * 0.025;
                var zeronspot = zerospot + zerodelta;
                var zeroTermPnl = zeronspot - this.spot;

                zeroTermChart.push({
                  //x: Number(zeronspot).toFixed(2),
                  x: zeronspot,
                  y: zeroTermPnl * count
                });
              }
              var capGain = nspot - this.spot;
              ////console.log(y, nspot, this.spot, capGain);
              this.TDArr[y][i] = capGain * count;
            }
          }
        }

      if (this.posList.products[j].type == 'call') {
        for (var i = 0; i <= 9; i++) {
          var nterm = Number(currentTerm) - i/365;
          if (nterm <= 0) {
            nterm = .00000001;
          }

          for (var y = 0; y < 21; y++) {

            var deltaPercent = y * Number(this.spot)/40;

            var spot = Number(this.spot) * 1.25;
            var delta = y * this.spot * 0.025;
            var nspot = spot - delta;

            if (i == 0) {
              //keep for percent
              // var percent = 20;
              // var npercent = percent - y*2;
              //////console.log(nspot);

              var zerospot = Number(this.spot) * 0.75;
              var zerodelta = y * this.spot * 0.025;
              var zeronspot = zerospot + zerodelta;
              var zeroTermPnl = (blackScholes.priceBS(zeronspot, this.posList.products[j].strike, 0.0000000000001, this.vol, this.interest, "call") - premium) * count;


              zeroTermChart.push({
                //x: Number(zeronspot).toFixed(2),
                x: zeronspot,
                y: zeroTermPnl
              });
            }

            var call_price_float = blackScholes.priceBS(nspot, this.posList.products[j].strike, nterm, this.vol, this.interest, "call") ;
            // ////////console.log(nspot,this.posList.products[j].strike,term,nterm,"|",i,y,call_price_float); //debug
            this.TDArr[y][i] = (call_price_float - premium) * count;
            ////console.log( "exp Date: "+ expDate + "currentTerm: "+currentTerm +" "+ i +" "+ y+" "+ " "+this.TDArr[y][i] + " pnl "+ call_price_float + " nterm: "+ nterm + "nspot: "+ nspot + "delta: " + delta);

          }
        }
      }

      if (this.posList.products[j].type == 'put') {
        for (var i = 0; i <= 9; i++) {

          var nterm = Number(currentTerm) - i/365;
          if (nterm <= 0) {
            nterm = .00000001;
          }

          for (var y = 0; y < 21; y++) {

            var deltaPercent = y * Number(this.spot)/40;

            var spot = Number(this.spot) * 1.25;
            var delta = y * this.spot * 0.025;
            var nspot = spot - delta;

            if (i == 0) {


              var zerospot = Number(this.spot) * 0.75;
              var zerodelta = y * this.spot * 0.025;
              var zeronspot = zerospot + zerodelta;
              var zeroTermPnl = (blackScholes.priceBS(zeronspot, this.posList.products[j].strike, 0.0000000000001, this.vol, this.interest, "put") - premium)  * count;

              zeroTermChart.push({
                  //x: Number(zeronspot).toFixed(2),
                  x: zeronspot,
                  y: zeroTermPnl
                });
                //////console.log(nspot);
                //////console.log(zeroTermChart);
            }
            var put_price_float = blackScholes.priceBS(nspot, this.posList.products[j].strike, nterm, this.vol, this.interest, "put");
            //console.log(nspot, nterm,put_price_float, premium,put_price_float - premium);
            // ////////console.log(nspot,this.posList.products[j].strike,term,nterm,"|",i,y,call_price_float); //debug
            this.TDArr[y][i] = (put_price_float - premium) * count;
              ////console.log( "exp Date: "+ expDate + "currentTerm: "+currentTerm +" "+ i +" "+ y+" "+ " "+this.TDArr[y][i] + " pnl "+ put_price_float + " nterm: "+ nterm + "nspot: "+ nspot + "delta: " + delta);

          }
        }
      }
    } else {

      if (this.posList.products[j].type == 'XBT') {
        for (var i = 0; i <= 9; i++) {
          var nterm = Number(currentTerm) - i/365;
          if (nterm <= 0) {
            nterm = .00000001;
          }

          for (var y = 0; y < 21; y++) {

            var deltaPercent = y * Number(this.spot)/40;

            var spot = Number(this.spot) * 1.25;
            var delta = y * this.spot * 0.025;
            var nspot = spot - delta;



            if (i == 0) {
              var zerospot = Number(this.spot) * 0.75;
              var zerodelta = y * this.spot * 0.025;
              var zeronspot = zerospot + zerodelta;
              var zeroTermPnl = (zeronspot - this.spot)*count;
              zeroTermChart[y].y += zeroTermPnl;
            }

            var capGain = nspot - this.spot;
              ////console.log(y, nspot, this.spot, capGain);
            // ////////console.log(nspot,this.posList.products[j].strike,term,nterm,"|",i,y,call_price_float); //debug
            this.TDArr[y][i] = this.TDArr[y][i] + capGain * count;
            ////console.log( "exp Date: "+ expDate + "currentTerm: "+currentTerm +" "+ i +" "+ y+" "+ " "+this.TDArr[y][i] + " pnl "+ call_price_float + " nterm: "+ nterm + "nspot: "+ nspot + "delta: " + delta);

          }
        }
      }

      if (this.posList.products[j].type == 'call') {
        for (var i = 0; i <= 9; i++) {
          var nterm = Number(currentTerm) - i/365;
          if (nterm <= 0) {
            nterm = .00000001;
          }

          for (var y = 0; y < 21; y++) {

            var deltaPercent = y * Number(this.spot)/40;

            var spot = Number(this.spot) * 1.25;
            var delta = y * this.spot * 0.025;
            var nspot = spot - delta;



            if (i == 0) {
              var zerospot = Number(this.spot) * 0.75;
              var zerodelta = y * this.spot * 0.025;
              var zeronspot = zerospot + zerodelta;
              var zeroTermPnl = (blackScholes.priceBS(zeronspot, this.posList.products[j].strike, 0.0000000000001, this.vol, this.interest, "call")-premium) * count;
              zeroTermChart[y].y += zeroTermPnl;
            }

            var call_price_float = blackScholes.priceBS(nspot, this.posList.products[j].strike, nterm, this.vol, this.interest, "call");
            // ////////console.log(nspot,this.posList.products[j].strike,term,nterm,"|",i,y,call_price_float); //debug
            this.TDArr[y][i] = this.TDArr[y][i] + (call_price_float - premium) * count;
            ////console.log( "exp Date: "+ expDate + "currentTerm: "+currentTerm +" "+ i +" "+ y+" "+ " "+this.TDArr[y][i] + " pnl "+ call_price_float + " nterm: "+ nterm + "nspot: "+ nspot + "delta: " + delta);

          }
        }
      }

      if (this.posList.products[j].type == 'put') {
        for (var i = 0; i <= 9; i++) {
          var nterm = Number(currentTerm) - i/365;
          if (nterm <= 0) {
            nterm = .00000001;
          }
          for (var y = 0; y < 21; y++) {

            var deltaPercent = y * Number(this.spot)/40;

            var spot = Number(this.spot) * 1.25;
            var delta = y * this.spot * 0.025;
            var nspot = spot - delta;



            if (i == 0) {

              var zerospot = Number(this.spot) * 0.75;
              var zerodelta = y * this.spot * 0.025;
              var zeronspot = zerospot + zerodelta;

              var zeroTermPnl = (blackScholes.priceBS(zeronspot, this.posList.products[j].strike, 0.0000000000001, this.vol, this.interest, "put")-premium) * count;
              zeroTermChart[y].y += zeroTermPnl;
            }
            var put_price_float = blackScholes.priceBS(nspot, this.posList.products[j].strike, nterm, this.vol, this.interest, "put");
            //console.log(nspot, nterm,put_price_float, premium,put_price_float - premium);
            ////console.log(nspot,this.posList.products[j].strike,term,nterm,"|",i,y,call_price_float); //debug
            this.TDArr[y][i] = this.TDArr[y][i] + (put_price_float - premium) * count;
            ////console.log( "exp Date: "+ expDate + "currentTerm: "+currentTerm +" "+ i +" "+ y+" "+ " "+this.TDArr[y][i] + " pnl "+ put_price_float + " nterm: "+ nterm + "nspot: "+ nspot + "delta: " + delta);

          }
        }
      }
    }
  }

    var getChartArrayPercent = function(Arr) {

      var chartArray = [];
      for (var i = 0; i < 21; i++) {
        var percent = 25;
        var npercent = percent - i*2.5;
        chartArray.push({
            x:npercent,
            y:Arr[i][0]
        });
     }
     return chartArray;
    };

    var getChartArray = function(Arr, intSpot) {
      var chartArray = [];
      //////console.log(intSpot);
      for (var i = 0; i <=20; i++) {

        var spotX = Number(intSpot) * 0.75;
        //spot = Number(spot).toFixed(2);
        var nspotX = spotX + i * 0.025 * intSpot;
        //nspot = Number(nspot).toFixed(2);

        var j = Arr.length - i - 1;

        //////console.log(i)
      //  ////console.log(j)

        //////console.log(nspot);
        chartArray.push({
          //  x: Number(nspotX).toFixed(2),
            x: nspotX,
            y: Arr[j][0]

        });
     }

     //////console.log(chartArray);
     return chartArray;
    };

    this.getZeroTermArray = function() {
      //////console.log(zeroTermChart);
      return zeroTermChart;
    }

    this.getChart = function() {
      return getChartArray(this.TDArr, this.spot);
    }
};
 return sensitivityTable;
}]);
