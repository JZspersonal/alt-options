angular.module("myApp.controllers").controller('settingsCtrl', ['$scope', '$rootScope', 'AOapi', '$location', '$window', 'Notification',function($scope, $rootScope, AOapi, $location, $window, Notification){

$scope.showModal = false;
$rootScope.userMargin = $window.localStorage.getItem('userMargin');
$rootScope.USDBalance = $window.localStorage.getItem('USDBalance');
$rootScope.XBTBalance = $window.localStorage.getItem('XBTBalance');
$rootScope.total_exposure = $window.localStorage.getItem('totalExposure');
$rootScope.total_pnl = $window.localStorage.getItem('totalPNL');
$rootScope.spot_sell = $window.localStorage.getItem("spot_sell");
$rootScope.spot_buy = $window.localStorage.getItem("spot_buy");



$rootScope.Notification = function(object, type) {
    console.log(object,type);
    if (type == "success") {
      Notification.success({message: object, title: '<i>Notification</i>'});
    } else {
      Notification.warning({message: object, title: '<i>Notification</i>'});
    }
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

$scope.getClosedOrders = function(){
  AOapi.Account.getClosedOrders().then(function(response){
    $scope.totalRecords = response.data.orders;
  });
};

$scope.getTotalFees = function(){
  AOapi.User.getTotalFees().then(function(response){
    $scope.totalFees = response.data.total_fees;
  });
};

$scope.getUserPram = function() {
  AOapi.User.getUserPram().then(function(response){
    $scope.userParams = response.data;
  });
};

$scope.getUserMargin = function(){
  AOapi.User.getUserMargin().then(function(response){
    $rootScope.userMargin = response.data;
  });
};

$scope.get2FAStatus = function(){
  AOapi.User.get2FAStatus().then(function(response){
    $scope.TFAStatus = response.data.enabled;
  });
};

$scope.getTrades = function(ordID){
  var data = {orderID: ordID};
  AOapi.Trading.getTrades(data).then(function(response){
      $scope.current_trade = response.data.order_executions;
      $scope.openModal();
  })
};


$scope.depositUSD = function(amount){
  var data = {
    amount: amount,
    device_id: null
  }
  AOapi.User.depositUSD(data).then(function(response){
    if(response.result == "Success") {
      $rootScope.Notification("Deposit Success", "success");
    } else {
      $rootScope.Notification("Deposit Failed", null);
    }
  });
};

$scope.depositXBT = function(){
  AOapi.User.depositXBT().then(function(response){
    if(response.result == "Success") {
      $rootScope.Notification("Deposit Success", "success");
    } else {
      $rootScope.Notification("Deposit Failed", null);
    }
  });
};

$scope.withdrawXBT = function(addr, amount){
  var data = {
    addr: addr,
    amount: amount
  };
  AOapi.User.withdrawXBT(data).then(function(response){
    if(response.result == "Success") {
      $rootScope.Notification("Withdrawal of "+ amount + "BTC to "+ addr+ " is complete", "success");
    } else {
      $rootScope.Notification("Withdrawal Failed", null);
    }
  });
};

$scope.withrdrawUSD = function(amount){
  var data = {
    amount: amount,
    device_id: null
  }
  AOapi.User.withrdrawUSD(data).then(function(response){
    if(response.result == "Success") {
      $rootScope.Notification("Withdrawal of "+ amount + "USD is complete", "success");
    } else {
      $rootScope.Notification("Withdrawal Failed", null);
    }
  });
};

$scope.submitBank = function(routing, type, acc_num, device_id){
  var data = {
    routing: routing,
    typ: type,
    acc_num: acc_num,
    device_id: null
  }
  AOapi.User.submitBank(data).then(function(response){
    if(response.result == "Success") {
      $rootScope.Notification("Banking info submitted", "success");
    } else {
      $rootScope.Notification("Submission failed", null);
    }
  });
};


$scope.changeUserParams = function(first_name,last_name,dob,cell,addr_street,addr_city,addr_state,addr_zip) {

  var data = {
  first_name: first_name,
  last_name: last_name,
  dob: dob,
  cell: cell,
  addr_street: addr_street,
  addr_city: addr_city,
  addr_state: addr_state,
  addr_zip: addr_zip,
  };
  AOapi.User.changeUserPram(data).then(function(response){
    alert("Update Success!");
  });
};

$scope.enable2FA = function(){
  AOapi.User.enable2FA().then(function(response){
    if(response.result == "Success"){
      console.log("2FA enabled");
    } else {
      alert(response.msg);
    }
  });
};

$scope.disable2FA = function(){
  AOapi.User.disable2FA().then(function(response){
    if(response.result == "Success"){
      console.log("2FA disabled");
    } else {
      alert(response.msg);
    }
  });
};

$scope.resetPassword = function(opsw, npsw){
  var data = {opword: opsw, npword: npsw};
  AOapi.User.resetPassword(data).then(function(response){
    if(response.result == "Success"){
      alert("Your new password has been saved!");
      console.log("Password Updated");
    } else {
      alert(response.msg);
    }
  });
};

$scope.openModal = function () {
  $scope.showModal = true;
};

$scope.closeModal = function () {
  $scope.showModal = false;
};

$rootScope.changeView = function(view) {
  $location.path(view);
};

$rootScope.updateOrderInput = function(ordPrice,ordAmt,ordProd) {
  $rootScope.ordProd = ordProd.toString();
  $rootScope.ordPrice = ordPrice.toString();
  $rootScope.ordAmt = ordAmt.toString();
  $rootScope.market = false;
  $rootScope.value = 'option';
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

$scope.getClosedOrders();
$scope.getUserMargin();
$scope.get2FAStatus();
$scope.getUserPram();
$scope.getTotalFees();
$scope.updateBalances();
AOapi.Trading.getExecutions().then(function (response) {
    $scope.notifications = response.data;
});

setInterval(function(){
  $scope.getClosedOrders();
  $scope.getUserMargin();
  $scope.get2FAStatus();
  $scope.updateBalances();
  AOapi.Trading.getExecutions().then(function (response) {
      $scope.notifications = response.data.notifications;
  });
}, 5000);

setInterval(function(){
  $scope.getUserPram();
  $scope.getTotalFees();
  // $scope.getUserPram();
}, 30000);

}]);
