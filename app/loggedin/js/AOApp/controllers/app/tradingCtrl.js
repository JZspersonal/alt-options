angular.module('myApp.controllers').controller('tradingCtrl', ['$scope', '$rootScope','getUSTreasury','$interval', '$document', '$window' , 'AOapi', 'orders', 'optionChain', 'greeks', '$location', 'Notification','getBTCUSD', function($scope, $rootScope, getUSTreasury, $interval, $document, $window, AOapi, orders, optionChain, greeks, $location, Notification, getBTCUSD){

//setting up variables ---------------------------------------------------------
$rootScope.expTime = "2016-01-31T23:59:59";
$rootScope.ordProd = 'XBT'; //ng-model this through the view
$rootScope.ordPrice = '0.00';
$rootScope.ordAmt = 0.00;
$rootScope.market = false;
$rootScope.value = "spot";
$rootScope.tabDisplay = {position: true, open: false, closed: false};

getUSTreasury.then(function(data){
  var re = /("[A-Z]+\\r")/;
  var str = JSON.stringify(data);
  var subst = '"VALUE"';
  var result = JSON.parse(str.replace(re, subst));
  $scope.interest = result.VALUE/100;
  $window.localStorage.setItem("Interest", $scope.interest);
});

//------------------------------------------------------------------------------
//General functions ------------------------------------------------------------
$rootScope.Notification = function(object, type) {
    console.log(object,type);
    if (type == "success") {
      Notification.success({message: object, title: '<i>Notification</i>'});
    } else {
      Notification.warning({message: object, title: '<i>Notification</i>'});
    }
};

$scope.getOptionChain = function(){
  var data = {expTime: $rootScope.expTime};
  optionChain.getOptionChain(data).then(function(resp){
    $rootScope.optionChain = resp;
    $window.localStorage.setItem('optionChain', JSON.stringify(resp));
  });
};

$scope.getOrders = function() {
  orders.getOrders().then(function(data){
    var total_exposure = 0;
    var total_pnl = 0;
    for(var i = 0; i < data.positions.length; i++){
      total_exposure += data.positions[i].amount * data.positions[i].avg_cost;
      total_pnl += data.positions[i].amount * (data.positions[i].last_price - data.positions[i].avg_cost);
    }
    $rootScope.total_exposure = total_exposure;
    $window.localStorage.setItem('totalExposure', $rootScope.total_exposure);
    $rootScope.total_pnl = total_pnl;
    $window.localStorage.setItem('totalPNL', $rootScope.total_pnl);
    $scope.orderTable = data;
    $window.localStorage.setItem('positions', JSON.stringify($scope.orderTable.positions));
  //  console.log(JSON.parse($window.localStorage.getItem('positions')));
    // $rootScope.getExposure();
    $scope.greekTbl = greeks.getGreeks($scope.orderTable.positions);
  })
};

$scope.updateBalances = function() {
  AOapi.Account.getBalances().then(function(response){
    //var data = JSON.parse(response);
    if (response.data.result == "SessionNotActive" || response.data.result == "AuthTokenRequiresRenewal" || response.data.result == "InvalidAuthToken" || response.data.result == "BadRequest") {
      $window.localStorage.clear();
      $rootScope.Notification("Your session has expired, please login again!", "warning");
      $window.location.href = "../login.html";
    }
    if (response.data.balances.XBT !== undefined) {
      $rootScope.XBTBalance = parseFloat(response.data.balances.XBT).toFixed(4);
      //$('.XBTBalance').html(parseFloat(data.balances.XBT).toFixed(4));
      $window.localStorage.setItem('XBTBalance', $rootScope.XBTBalance);
    }
    else {
      $rootScope.XBTBalance = 0.000;
    };

    if (response.data.balances.USD !== undefined) {
      $rootScope.USDBalance = parseFloat(response.data.balances.USD).toFixed(4);
      //$('.XBTBalance').html(parseFloat(data.balances.XBT).toFixed(4));
        $window.localStorage.setItem('USDBalance', $rootScope.USDBalance);
    }
    else {
      $rootScope.USDBalance = 0.000;
    };
  });
};


$scope.getLastTrades = function() {
  AOapi.Product.getLastTrades().then(function(response){
    //var data = JSON.parse(response);
    $scope.orderExecutions = response.data.order_executions;
  });
};

$scope.getOrderBook = function(ordProd) {
  var data = {ordProd: ordProd};
  AOapi.Product.getOrderBook(data).then(function(response){
    $scope.bids = response.data.bids;
    var stack = [];
    for (var i = 0; i < response.data.asks.length; i++) {
      var n = response.data.asks.length - 1 - i;
      stack.push(response.data.asks[n]);
    };
    $scope.asks = stack;
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
    $scope.combinedBA = {
      asks: $scope.asks,
      bids: $scope.bids
    };
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


$scope.getExpirations = function() {
  AOapi.Product.getExpirations().then(function(response){
    $scope.expirations = response.expireTimes;
  });
};

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
    ordAmt: $rootScope.ordAmt.toString(),
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
      $rootScope.Notification("Order Rejected! There isn't enough liquidity, please try to use LIMIT ORDER!", "warning");
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
  if ($scope.market) {
    var price = "0";
  } else {
      var price = $rootScope.ordPrice // ng-model it
  };
  var data = {
    ordPrice: price,
    ordAmt: $rootScope.ordAmt.toString(),
    ordProd: $rootScope.ordProd
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

$scope.cancelOrd = function(ordId){
  var data = {orderID: ordId};
  AOapi.Trading.cancelOrder(data).then(function (response) {
    if (response.data.result == "Success") {
        console.log("reject!");
        Notification.success({message: "Order has been successfully cancelled!", title: "<i>Notification</i>"});
    };
    console.log(data);
    $scope.getOrders();
  });
};

$scope.closePos = function(ordPrice, ordAmt, ordProd){

    if (Number(ordAmt) < 0) {

      var data = {
        ordPrice: 'inf',
        ordAmt: Math.abs(Number(ordAmt)).toString(),
        ordProd: ordProd
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
          $rootScope.Notification("Order Rejected! There isn't enough liquidity, please try to use LIMIT ORDER!", "warning");
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
    } else {
      var data = {
        ordPrice: '0',
        ordAmt: ordAmt.toString(),
        ordProd: ordProd
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
    }
  };


//update spot orders//
$rootScope.updateOrderInputS = function(ordPrice,ordAmt) {
  //alert("doing");
  $rootScope.ordProd = 'XBT';
  $rootScope.ordPrice = ordPrice.toString();
  $rootScope.ordAmt = Math.abs(ordAmt.toString());
  $rootScope.market = false;
  $rootScope.value = 'spot';
};

$rootScope.updateOrderInput = function(ordPrice,ordAmt,ordProd) {
  $rootScope.ordProd = ordProd.toString();
  $rootScope.ordPrice = ordPrice.toString();
  $rootScope.ordAmt = Math.abs(ordAmt.toString());
  $rootScope.market = false;
  if (ordProd == "XBT") {
    $rootScope.value = 'spot';
  } else {$rootScope.value = 'option';
  }
};

$scope.updateExecutions = function(ordId) {
  var data = {orderID: ordId};
	AOapi.Trading.getTrades(data).then(function(data) {
    $scope.orderExecutions = data.order_executions;
	});
};

$scope.changeTab = function(tab) {
  $rootScope.tabDisplay.position = false;
  $rootScope.tabDisplay.open = false;
  $rootScope.tabDisplay.closed = false;
  $rootScope.tabDisplay.tab = true;
};

//------------------------------------------------------------------------------
// changeview ------------------------------------------------------------------

$rootScope.changeView = function(view) {
  $location.path(view);
};

//------------------------------------------------------------------------------
//misc----------------------------------------------------------

$scope.getTotal = function(){
    var sumGreek = {};
    var delta = 0;
    var gamma = 0;
    var theta = 0;
    var vega = 0;

    for(var i = 0; i < $scope.greekTbl.length; i++){
        var product = $scope.greekTbl[i];
        delta += $scope.greekTbl[i].delta;
        gamma += $scope.greekTbl[i].gamma;
        theta += $scope.greekTbl[i].theta;
        vega += $scope.greekTbl[i].vega;
    }
    sumGreek.delta = delta;
    sumGreek.gamma = gamma;
    sumGreek.theta = theta;
    sumGreek.vega = vega;
    return sumGreek;
};

// $rootScope.getExposure = function(){
//     var total_exposure = 0;
//     var total_pnl = 0;
//     for(var i = 0; i < $scope.orderTable.positions.length; i++){
//       total_exposure += $scope.orderTable.positions[i].amount * $scope.orderTable.positions[i].avg_cost;
//       total_pnl += $scope.orderTable.positions[i].amount * ($scope.orderTable.positions[i].last_price - $scope.orderTable.positions[i].avg_cost);
//     }
//     $rootScope.total_exposure = total_exposure;
//     $rootScope.total_pnl = total_pnl;
// };


$scope.getUserMargin = function(){
  AOapi.User.getUserMargin().then(function(response){
    $rootScope.userMargin = response.data;
    $window.localStorage.setItem('userMargin', JSON.stringify(response.data));
  });
};

$scope.getExpirations = function() {
  AOapi.Product.getExpirations().then(function(response){
    $rootScope.optionExps = response.data.expire_times;
    $window.localStorage.setItem('optionExps', JSON.stringify(response.data.expire_times));
  });
};

$scope.updateExp = function(date) {
  $rootScope.expTime = date;
  $scope.getOptionChain();
  $scope.getExpirations();
};

//added function to get EXP dates; for exp dates udpate.

$rootScope.logOut = function(){
  AOapi.User.logOut().then(function(response){
    if (response.data.result == success) {
      $window.localStorage.clear();
      $rootScope.Notification("Successfuly logged out!", "success");
      $window.location.href = "../login.html";
    }
  });
};
// initialization and runtime operations----------------------------------------
$scope.updateBalances();
$scope.getUserMargin();
$scope.getOrders();
$scope.getOrderBook('XBT');
$scope.getOptionChain();
$scope.getLastTrades();
$scope.getExpirations();

$scope.$on("switched", function(evt, data){
   $scope.updateOrderInputS(data.ordPrice, data.ordAmt);
});


$interval(function(){
  $scope.updateBalances();
  $scope.getOptionChain();
  $scope.getOrders();
  $scope.getUserMargin();
  $scope.getLastTrades();
  $scope.getOrderBook('XBT');
  // AOapi.Trading.getExecutions().then(function (response) {
  //   if (response.data.notifications[0].event == "OrderCompleted") {
  //     $rootScope.Notification("Your limit order ID [" + response.data.notifications[0].params.order_id + "] has been executed @" + response.data.notifications[0].time , "success");
  //   }
  // });
}, 5000);

}]);
//------------------------------------------------------------------------------
