
angular.module("myApp.controllers").controller('analyticsCtrl', ['$scope','$rootScope','$timeout','getUSTreasury' ,'getBTCUSD', 'probabilityChart', 'normDistPrice', 'position','optionChain','$window' ,'AOapi', 'position', 'positionList' , 'sensitivityTable', 'orders','$location','Notification','$interval', '$q','volatilityCalc',function($scope, $rootScope,$timeout, getUSTreasury,getBTCUSD, probabilityChart,normDistPrice, position, optionChain, $window, AOapi, positions, positionList, sensitivityTable, orders, $location, Notification, $interval, $q, volatilityCalc){

  $scope.showModal = false;
  $rootScope.userMargin = JSON.parse($window.localStorage.getItem('userMargin'));
  $rootScope.expTime =  "2016-01-31T23:59:59";
  $rootScope.spot = $window.localStorage.getItem("BTCUSD");
  $rootScope.USDBalance = $window.localStorage.getItem('USDBalance');
  $rootScope.XBTBalance = $window.localStorage.getItem('XBTBalance');
  $rootScope.total_exposure = $window.localStorage.getItem('totalExposure');
  $rootScope.total_pnl = $window.localStorage.getItem('totalPNL');
  $rootScope.optionChain = JSON.parse($window.localStorage.getItem('optionChain'));
  $rootScope.spot_sell = $window.localStorage.getItem("spot_sell");
  $rootScope.spot_buy = $window.localStorage.getItem("spot_buy");
  $rootScope.userMargin = $window.localStorage.getItem("userMargin");
  $rootScope.optionExps = JSON.parse($window.localStorage.getItem("optionExps"));
  $rootScope.graphData = {};

  // setup for further optimisation---------------------------------------------
  // var promises = [calcVol(), getBTCUSD, getUSTreasury];
  //
  // $q.all(promises).then(function(values){
  //   console.log(values);
  //
  //
  //   $scope.btcVol = values[0];
  //   $window.localStorage.setItem('btcVol', $scope.btcVol);
  //
  //   $rootScope.spot = values[1].spot;
  //   $window.localStorage.setItem('BTCUSD', $rootScope.spot);
  //
  //   var re = /("[A-Z]+\\r")/;
  //   var str = JSON.stringify(values[2]);
  //   var subst = '"VALUE"';
  //   var result = JSON.parse(str.replace(re, subst));
  //   $scope.interest = result.VALUE/100;
  //   $window.localStorage.setItem("Interest", $scope.interest);
  //
  //   console.log($scope.btcVol, $rootScope.spot, $scope.interest);
  // });
  //
  // function calcVol() {
  //   return volatilityCalc.calculateVolatility(90);
  // };

  function initializeSpot() {
    if ($window.localStorage.getItem('BTCUSD') == undefined || $window.localStorage.getItem('BTCUSD') == null) {
        $scope.getOrderBook("XBT");
    } else {
      $rootScope.spot = $window.localStorage.getItem('BTCUSD');
    }
  };

  initializeSpot();


  volatilityCalc.calculateVolatility(90).then(function(response){
    $scope.btcVol = response;
    $window.localStorage.setItem('btcVol', $scope.btcVol);
    $scope.createSensitivityTable();
    console.log($rootScope.zeroTermArray, $rootScope.chartArray);
    $scope.createpnlChart();
  });


  getUSTreasury.then(function(data){
    var re = /("[A-Z]+\\r")/;
    var str = JSON.stringify(data);
    var subst = '"VALUE"';
    var result = JSON.parse(str.replace(re, subst));
    $scope.interest = result.VALUE/100;
    $window.localStorage.setItem("Interest", $scope.interest);
  });


  //positionList Manipulation
  //------------------------------------------------------------------------------------------------------------------------------------------------------------

  getGraphData();

  $scope.createprobChart = function(data30, data60, data90) {
    // console.log(data30, data60, data90);
    // console.log("createpnlChart() being run");


    $scope.options2 = {

      chart: {
            type: 'lineChart',
            height: 340,
            margin : {
                top: 20,
                right: 30,
                bottom: 40,
                left: 70
            },
            x: function(d){ return d.x; },
            y: function(d){ return d.y; },
            useInteractiveGuideline: true,
            dispatch: {
                // stateChange: function(e){ //console.log("stateChange"); },
                // changeState: function(e){ //console.log("changeState"); },
                // tooltipShow: function(e){ //console.log("tooltipShow"); },
                // tooltipHide: function(e){ //console.log("tooltipHide"); }
            },
            xAxis: {
                axisLabel: 'Price',
                tickFormat: function(d){
                    return d3.format('.02f')(d);
                },
            },
            yAxis: {
                axisLabel: 'Prob(%)',
                tickFormat: function(d){
                    return d3.format('.02f')(d);
                },
                axisLabelDistance: 20
            },
            callback: function(chart){
                //console.log("!!! lineChart callback !!!");
            }
        },
      };

    /* Chart data */
    $scope.data2 = [

      {
          values: data30,      //values - represents the array of {x,y} data points
          key: '30 Days Range', //key  - the name of the series.
          color: 'rgba(255, 255, 255, 0.3)',
          // area: true
          //color - optional: choose your own line color.
      },{
          values: data60,
          key: '60 Days Range',
          color: 'rgba(255, 255, 255, 0.8) ',
          // area: true

      }, {
          values: data90,
          key: '90 Days Range',
          color: 'rgba(44, 190, 44, 0.8) ',
          // area: true

      }
    ];

    $scope.config2 = {
      deepWatchData: true,
      refreshDataOnly: false
    };
  };

  $scope.createpnlChart = function() {
    // //console.log("createpnlChart() being run");
    $scope.options = {

      chart: {
            type: 'lineChart',
            height: 340,
            margin : {
                top: 20,
                right: 30,
                bottom: 40,
                left: 70
            },
            x: function(d){ return d.x; },
            y: function(d){ return d.y; },
            useInteractiveGuideline: true,
            dispatch: {
                // stateChange: function(e){ //console.log("stateChange"); },
                // changeState: function(e){ //console.log("changeState"); },
                // tooltipShow: function(e){ //console.log("tooltipShow"); },
                // tooltipHide: function(e){ //console.log("tooltipHide"); }
            },
            xAxis: {
                axisLabel: 'Price',
                tickFormat: function(d){
                    return d3.format('.02f')(d);
                },
            },
            yAxis: {
                axisLabel: 'Profit',
                tickFormat: function(d){
                    return d3.format('.02f')(d);
                },
                axisLabelDistance: 20
            },
            callback: function(chart){
                //console.log("!!! lineChart callback !!!");
            }
        },
      };

    /* Chart data */
    $scope.data = [

      {
          values: $rootScope.chartArray,      //values - represents the array of {x,y} data points
          key: 'Current P/L', //key  - the name of the series.
          color: 'rgba(255, 255, 255, 0.3)',
          area: true
          //color - optional: choose your own line color.
      },{
          values: $rootScope.zeroTermArray,
          key: 'Expiration P/L',
          color: 'rgba(44, 190, 44, 0.8) ',
          area: true

      }
    ];
    $scope.config = {
      deepWatchData: true,
      refreshDataOnly: true
    };
  };

$rootScope.positions = new positionList();

function retrievePositions(){
   var products = JSON.parse($window.localStorage.getItem('positions'));
   for (var i = 0; i < products.length; i++){
     var symbol = products[i].symbol;
     var bid = products[i].bid_price;
     var ask = products[i].ask_price;
     var amount = products[i].amount;
     var spot = $rootScope.spot;
     var pos = new position(symbol, bid, ask, amount, spot);
     //if(pos.type != "XBT"){
       $rootScope.positions.addPosition(pos);
    // };
   };
   $scope.$watch(function(rootScope) {return rootScope.positions.totalAmount},
   function(){
   $scope.createSensitivityTable();
   $scope.createpnlChart();
     //console.log("data-changed");
   }
   );
   $scope.$watch(function(rootScope) {return rootScope.positions.products.length},
   function(){
     $scope.createSensitivityTable();
     $scope.createpnlChart();
     //console.log("data-changed");
   }
   );
 };

retrievePositions();

function getProbChart() {
  probabilityChart.getRanges().then(function(response){
    $scope.probabilityChart = response;
  });
}
getProbChart();

function getGraphData(){
  price = $window.localStorage.getItem("BTCUSD");
  var promises = [normDistPrice.getPoints(price, 30), normDistPrice.getPoints(price, 60), normDistPrice.getPoints(price, 90)];
  $q.all(promises).then(function(values){
    var init30 = [{x:1,y:0},{x:2,y:0},{x:3,y:0},{x:4,y:0},{x:5,y:0},{x:6,y:0},{x:7,y:0},{x:8,y:0},{x:9,y:0}];
    var init60 = [{x:1,y:0},{x:2,y:0},{x:3,y:0},{x:4,y:0},{x:5,y:0},{x:6,y:0},{x:7,y:0},{x:8,y:0},{x:9,y:0}];
    var init90 = [{x:1,y:0},{x:2,y:0},{x:3,y:0},{x:4,y:0},{x:5,y:0},{x:6,y:0},{x:7,y:0},{x:8,y:0},{x:9,y:0}];
    $scope.createprobChart(init30, init60, init90);
    $timeout(function(){$scope.createprobChart(values[0], values[1], values[2]);});
  });
};



 $scope.updateBalances = function() {
   AOapi.Account.getBalances().then(function(response){
     if (response.data.result == "SessionNotActive" || response.data.result == "AuthTokenRequiresRenewal" || response.data.result == "InvalidAuthToken" || response.data.result == "BadRequest") {
       $window.localStorage.clear();
       $rootScope.Notification("Your session has expired, please login again!", "warning");
       $window.location.href = "../login.html";
     }
     if (response.data.balances.XBT !== undefined) {
       $rootScope.XBTBalance = parseFloat(response.data.balances.XBT).toFixed(4);
       $window.localStorage.setItem('XBTBalance', $rootScope.XBTBalance);
     }
     else {
       $rootScope.XBTBalance = 0.000;
     };

     if (response.data.balances.USD !== undefined) {
       $rootScope.USDBalance = parseFloat(response.data.balances.USD).toFixed(4);
         $window.localStorage.setItem('USDBalance', $rootScope.USDBalance);
     }
     else {
       $rootScope.USDBalance = 0.000;
     };
   });
 };

 $scope.getOrderBook = function(ordProd) {
   var data = {ordProd: ordProd};
   AOapi.Product.getOrderBook(data).then(function(response){
     if (ordProd == 'XBT') {
       if (response.data.asks[0] != null || response.data.asks[0] != undefined) {
         $rootScope.spot = response.data.asks[0].price;
         $window.localStorage.setItem('BTCUSD', $rootScope.spot);
         $rootScope.spot_sell = response.data.asks[0].price;
         $window.localStorage.setItem('spot_sell', $rootScope.spot_sell);
       } else {
         fetchItBitSpot();
       };
       $rootScope.spot_buy = response.data.bids[0].price;
       $window.localStorage.setItem('spot_buy', $rootScope.spot_buy);

     }
   });
 };

 function fetchItBitSpot() {
    getBTCUSD.then(function(data){
      $rootScope.spot = data.spot;
      $rootScope.spot_sell = data.spot;
      $window.localStorage.setItem('spot_sell', $scope.spot_sell);
      $window.localStorage.setItem('BTCUSD', data.spot);
    });
 };

 $scope.$watch(function(rootScope) {return rootScope.spot},
 function(){
   $scope.createSensitivityTable();
 });


 $rootScope.Notification = function(object, type) {
     if (type == "success") {
       Notification.success({message: object, title: '<i>Notification</i>'});
     } else {
       Notification.warning({message: object, title: '<i>Notification</i>'});
     }
 };

  $scope.newPos = function(symbol, bid, ask, amount) {
    return new position(symbol, bid, ask, amount, $scope.spot);
  };
  $scope.add = function(pos){

    $rootScope.positions.addPosition(pos);
    // $rootScope.Notification("Position added!", "success");
    //$rootScope.searchHistory.updateHistoryList($rootScope.tix, $rootScope.table.last,  $rootScope.positions, $rootScope.optionChain, $rootScope.table, 'add');
  };

  $scope.remove = function(pos) {

    $rootScope.positions.removePosition(pos);
    // $rootScope.Notification("Position removed/decreased!", "success");
    //$rootScope.searchHistory.updateHistoryList($rootScope.tix,$rootScope.table.last, $rootScope.positions,$rootScope.optionChain, $rootScope.table,'add');
  };
  $scope.delete = function(pos) {
    $rootScope.positions.deletePosition(pos);
    $rootScope.Notification("Position has been removed!", "success");
    //$rootScope.searchHistory.updateHistoryList($rootScope.tix, $rootScope.table.last, $rootScope.positions, $rootScope.optionChain, $rootScope.table, 'add');
  };

  $scope.deleteAll = function() {
    $rootScope.positions.clear();
    $rootScope.sumgreekArr = {delta:0,gamma:0,theta:0,vega:0,rho:0};
  };

  $scope.getexpDays = function(year,month,day) {
    var date = new Date();
    var expDate = new Date(year, month - 1, day);
    var currentTerm = Math.abs(Date.parse(expDate) - Date.parse(date)) / (1000 * 60 * 60 * 24);
    return currentTerm;
  };


  // modal closing

  $scope.openModal = function () {
    $scope.showModal = true;
  };

  $scope.closeModal = function () {
    $scope.showModal = false;
  };

 //------------------------------------------------------------------------------------------------------------------------------------------------------------

 //general functions
 //------------------------------------------------------------------------------------------------------------------------------------------------------------

  $scope.getOrders = function() {
    orders.getOrders().then(function(data){
      $rootScope.orderTable = data; //use $scope.orderTable.positions to get positions
      $window.localStorage.setItem('positions', JSON.stringify($scope.orderTable.positions));
      $scope.$watch(function(scope) {return scope.orderTable.positions.length},
      function(){
        $scope.createSensitivityTable();
      }
      );
    })
  };

  $scope.getUserMargin = function(){
    AOapi.User.getUserMargin().then(function(response){
      $rootScope.userMargin = response.data;
    });
  };

  $scope.getOptionChain = function(){
    var data = {expTime: $scope.expTime};
    optionChain.getOptionChain(data).then(function(resp){
      $scope.optionChain = resp;
    });
  };

  $scope.getExpirations = function() {
    AOapi.Product.getExpirations().then(function(response){
      $scope.expirations = response.data.expireTimes;
    });
  };

  $rootScope.updateOrderInput = function(ordPrice,ordAmt,ordProd, ordAsk) {
    $rootScope.ordProd = ordProd.toString();
    $rootScope.ordPrice = ordPrice.toString();
    $rootScope.ordAmt = ordAmt.toString();
    $rootScope.ordAsk = ordAsk.toString();
    $rootScope.market = false;
    $rootScope.value = 'option';
  };

  $scope.getOrders();
  $scope.getOptionChain();
  //$scope.getOrderBook('XBT');
  $scope.getExpirations();
  $scope.getUserMargin();

  $interval(function() {
      $scope.updateBalances();
      $scope.getOrders();
      $scope.getUserMargin();
      $scope.updateBalances();
      $scope.getOrderBook('XBT');
  }, 5000);

//get EXP function group here!
  $scope.getExpirations = function() {
    AOapi.Product.getExpirations().then(function(response){
      $rootScope.optionExps = response.data.expire_times;
      $window.localStorage.setItem('optionExps', JSON.stringify(response.data.expire_times));
    });
  };

  $scope.updateExp = function(date) {
    $scope.expTime = date;
    $scope.getOptionChain();
    $scope.getExpirations();
  };


  //------------------------------------------------------------------------------------------------------------------------------------------------------------
  //sensitivityTable and PnL Chart Manipulation
  //------------------------------------------------------------------------------------------------------------------------------------------------------------

  $scope.createSensitivityTable = function() {
    $scope.sensitivityTable = new sensitivityTable($rootScope.positions);
    $rootScope.chartArray = $scope.sensitivityTable.getChart();
    $rootScope.zeroTermArray = $scope.sensitivityTable.getZeroTermArray();
  };

    $rootScope.chartArray = [{x:1,y:0},{x:2,y:0},{x:3,y:0},{x:4,y:0},{x:5,y:0},{x:6,y:0},{x:7,y:0},{x:8,y:0},{x:9,y:0}];
    $rootScope.zeroTermArray = [{x:1,y:0},{x:2,y:0},{x:3,y:0},{x:4,y:0},{x:5,y:0},{x:6,y:0},{x:7,y:0},{x:8,y:0},{x:9,y:0}];

    $rootScope.buy = function() {
      // need to check whether getElementById works. Otherwise create a directive
      if ($scope.market) {
        var price = "Inf";
      } else {
        var price = $rootScope.ordPrice // ng-model it
        //var price = document.getElementById('ordPrice').value;
      };

      var data = {
        ordPrice: price,
        ordAmt: $rootScope.ordAmt,
        ordProd: $rootScope.ordProd
        //ordAmt: document.getElementById('ordAmt').value,
        //ordProd: document.getElementById('ordProd').innerHTML
      };

      AOapi.Trading.placeBid(data).then(function (response) {

        if (response.data.result == "MarginError") {
          $rootScope.Notification("Order Rejected! Insufficient available buying power, please try to use MARKET ORDER.", "warning");
        } else if (response.data.result == "OrderSizeError") {
          $rootScope.Notification("Order Rejected! Invalid order amount, please enter the correct order size!", "warning");
        } else if (response.data.result == "TickError") {
          $rootScope.Notification("Order Rejected! Invalid price amount, please enter the correct price size!", "warning");
        } else if (response.data.result == "LiquidityError") {
          $rootScope.Notification("Order Rejected! There isn't enough liquidity, please enter try LIMIT ORDER!", "warning");
        } else if (response.data.result == "Success"){
          $rootScope.Notification("Your limit order has been submitted!", "success");
          AOapi.Trading.getExecutions().then(function (response) {
            if (response.data.notifications[0].event == "OrderCompleted") {
              $rootScope.Notification("Your limit order ID [" + response.data.notifications[0].params.order_id + "] has been executed @" + response.data.notifications[0].time , "success");
            }
          });
          $scope.getOrders();
          $scope.getOptionChain();
          $scope.getLastTrades();
        } else {
          $rootScope.Notification("Order was not placed! Please enter valid price & amount!", "warning");
        }
      });
    };

    $rootScope.sell = function(){
        // need to check whether getElementById works. Otherwise create a directive
      if ($scope.market) {
        var price = "0";
      } else {
          var price = $rootScope.ordPrice // ng-model it
        //var price = document.getElementById('ordPrice').value;
      };
      var data = {
        ordPrice: price,
        ordAmt: $rootScope.ordAmt,
        ordProd: $rootScope.ordProd
        //ordAmt: document.getElementById('ordAmt').value,
        //ordProd: document.getElementById('ordProd').innerHTML
      };

      AOapi.Trading.placeAsk(data).then(function (response) {

        if (response.data.result == "MarginError") {
          $rootScope.Notification("Order Rejected! Insufficient available buying power, please try to use MARKET ORDER.", "warning");
        } else if (response.data.result == "OrderSizeError") {
          $rootScope.Notification("Order Rejected! Invalid order amount, please enter the correct order size!", "warning");
        } else if (response.data.result == "TickError") {
          $rootScope.Notification("Order Rejected! Invalid price amount, please enter the correct price size!", "warning");
        } else if (response.data.result == "LiquidityError") {
          $rootScope.Notification("Order Rejected! There isn't enough liquidity, please enter try LIMIT ORDER!", "warning");
        } else if (response.data.result == "Success"){
          $rootScope.Notification("Your limit order has been submitted!", "success");
          AOapi.Trading.getExecutions().then(function (response) {
            if (response.data.notifications[0].event == "OrderCompleted") {
              $rootScope.Notification("Your limit order ID [" + response.data.notifications[0].params.order_id + "] has been executed @" + response.data.notifications[0].time , "success");
            }
          });
          $scope.getOrders();
          $scope.getOptionChain();
          $scope.getLastTrades();
        } else {
          $rootScope.Notification("Order was not placed! Please enter valid price & amount!", "warning");
        }
      });

    };

    $scope.getColor = function (value) {
      var style = {background: "transparent"};
      if (value >= 0) {
        var a = 0;
        var b = Math.abs(value)/$rootScope.spot/Math.abs($rootScope.positions.totalAmount+0.00001) /20 + 0.15;
        style.background = "rgba(" + 0 + "," + 130 + "," + a + "," + b + ")"
      } else if (value < 0) {
        var a = 0;
        var b = Math.abs(value)/$rootScope.spot/Math.abs($rootScope.positions.totalAmount+0.00001) /20 + 0.15;
        style.background = "rgba(" + 255 + "," + a + "," + a + "," + b + ")"
      } else {
        return;
      }
      return style;
    };

    $scope.colorSpot = function (index) {
      var style = {background: "transparent"};
      if (index == 10) {
        style.background = "rgba(" + 255 + "," + 255 + "," + 255 + "," + 0.05 + ")";
        style["border-top"] = "1px solid rgba(" + 255 + "," + 255 + "," + 255 + "," + 0.3 + ")";
        style["border-bottom"] = "1px solid rgba(" + 255 + "," + 255 + "," + 255 + "," + 0.3 + ")";
      }
      return style;
    };

    $scope.getTotal = function(){
        var sumGreek = {};
        var delta = 0;
        var gamma = 0;
        var theta = 0;
        var vega = 0;

        for(var i = 0; i < $scope.positions.greekArr.length; i++){
            var product = $scope.positions.greekArr[i];
            delta += $scope.positions.greekArr[i].delta;
            gamma += $scope.positions.greekArr[i].gamma;
            theta += $scope.positions.greekArr[i].theta;
            vega += $scope.positions.greekArr[i].vega;
        }
        sumGreek.delta = delta;
        sumGreek.gamma = gamma;
        sumGreek.theta = theta;
        sumGreek.vega = vega;
        return sumGreek;
    };

    $rootScope.logOut = function(){
      AOapi.User.logOut().then(function(response){
        if (response.data.result == "success") {
          $window.localStorage.clear();
          $rootScope.Notification("Successfuly logged out!", "success");
          $window.location.href = "../login.html";
        }
      });
};


$rootScope.changeView = function(view) {
  $location.path(view);
};

//$scope.createSensitivityTable();
$scope.updateBalances();

$scope.modalArr = [];

$scope.modalOnChange = function(name, amount){
  if (amount != undefined) {
    if ($scope.modalArr.length == 0) {
      $scope.modalArr.push({
        name: name,
        amount: amount
      });
    } else {
      var found = false;
      for (var i = 0; i < $scope.modalArr.length; i++){
        if(name == $scope.modalArr[i].name) {
          found = true;
          $scope.modalArr[i].amount = amount;
          break;
        }
      };
      if (found == false) {
        $scope.modalArr.push({
          name: name,
          amount: amount
        });
      }
    }
  } else if (amount == undefined) {
    for (var i = 0; i < $scope.modalArr.length; i++){
      if ($scope.modalArr[i].name == name) {
        $scope.modalArr.splice(i, 1);
        break;
      }
    }
  }
};

$scope.updateModal = function(){
  var totalAmtChange = 0;
  for (var i = 0; i < $scope.modalArr.length; i++) {
    for (var j = 0; j < $scope.positions.products.length; j++) {
      if($scope.modalArr[i].name == $scope.positions.products[j].name) {
        totalAmtChange = totalAmtChange + ($scope.modalArr[i].amount - $scope.positions.products[j].amount);
        $scope.positions.products[j].amount = $scope.modalArr[i].amount;
        break;
      };
    };
  };
  $scope.positions.totalAmount = $scope.positions.totalAmount + totalAmtChange;
  $scope.modalArr = [];
};

//------------------------------------------------------------------------------------------------------------------------------------------------------------

}]);
