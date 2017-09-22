angular.module('myApp.services').factory('AOapi', ['$http', '$window', function($http, $window){


var urlAuthed = "https://aos-v3.alt-options.com/public/authed/";
var url = "https://aos-v3.alt-options.com/public/";

var AOapi = AOapi || {};

AOapi = {};

AOapi.User = {};

AOapi.Trading = {

    getTrades: function (data) {
        return $http({
            method: "POST",
            url: urlAuthed + "order_executions",
            dataType: "json",
            data: {
                auth_token: $window.localStorage.getItem('token'),
                order: data.orderID
            }
        });
    },

    exerciseOptions: function (callback, data) {
          return $http({
            type: "POST",
            url: urlAuthed + "exercise_options",
            dataType: "json",
            data: {
                auth_token: localStorage.getItem('token'),
                product: data.ordProd,
                amount: data.ordAmt,
            }
        });
    },

    getExecutions: function (callback) {
      return $http({
            method: "POST",
            url: urlAuthed + "notifications",
            dataType: "json",
            data: {
                auth_token: $window.localStorage.getItem('token'),
                num: 15,
            }
        });
    },

    placeBid: function (data) {
      return  $http({
            method: "POST",
            url: urlAuthed + "place_order",
            dataType: "json",
            data: {
                auth_token: $window.localStorage.getItem('token'),
                currency: "USD",
                product: data.ordProd,
                order_type: "Bid",
                price: data.ordPrice,
                amount: data.ordAmt
            }
        });
    },

    placeAsk: function (data) {
      return   $http({
            method: "POST",
            url: urlAuthed + "place_order",
            dataType: "json",
            data: {
                auth_token: $window.localStorage.getItem('token'),
                currency: "USD",
                product: data.ordProd,
                order_type: "Ask",
                price: data.ordPrice,
                amount: data.ordAmt
            }
        });
    },

    exerciseOptions: function (callback, data) {
      return  $http({
            method: "POST",
            url: urlAuthed + "exercise_options",
            dataType: "json",
            data: {
                auth_token: $window.localStorage.getItem('token'),
                product: data.ordProd,
                amount: data.ordAmt,
            }
        })
    },

    cancelOrder: function (data) {
      return  $http({
            method: "POST",
            url: urlAuthed + "cancel_order",
            dataType: "json",
            data: {
                auth_token: $window.localStorage.getItem('token'),
                id: data.orderID
            }
        })
    }
};

AOapi.Account = {
    getOpenOrders: function () {
      return  $http({
            method: "POST",
            url: urlAuthed + "orders",
            dataType: "json",
            data: {
                auth_token: $window.localStorage.getItem('token'),
                status: "Open",
            }
        });
    },

    getClosedOrders: function () {
      return  $http({
            method: "POST",
            url: urlAuthed + "orders",
            dataType: "json",
            data: {
                auth_token: $window.localStorage.getItem('token'),
                status: "Completed",
            }
        });
    },

    getRejectedOrders: function () {
      return   $http({
            method: "POST",
            url: urlAuthed + "orders",
            dataType: "json",
            data: {
                auth_token: $window.localStorage.getItem('token'),
                status: "AutoCanceled",
            }
        });
    },

    getBalances: function () {
      return  $http({
            method: "POST",
            url: urlAuthed + "balances",
            dataType: "json",
            data: {
                auth_token: $window.localStorage.getItem('token')
            }
        });
    },

    getPositions: function () {
      return   $http({
            method: "POST",
            url: urlAuthed + "positions",
            dataType: "json",
            data: {
                auth_token: $window.localStorage.getItem('token')
            }

        });
    }

};

AOapi.Product = {
    getOrderBook: function (data) {
      return $http({
            method: "POST",
            url: url + "orderbook",
            dataType: "json",
            data: {
                currency: "USD",
                product: data.ordProd,
                slots: 20,
            }
        });
    },

    getSymbols: function (callback) {
      return $http({
            method: "POST",
            url: url + "symbols",
            dataType: "json",
            data: {
                active_only: true
            }

        }).then(function (data) {
            callback(data);
        });
    },

    getOptions: function (data) {
      return $http({
            method: "POST",
            url: url + "options",
            dataType: "json",
            data: {
                product: "XBT",
                expire_time: data.expTime
            }
        });
    },

    getDepth: function () {
      return $http({
            method: "POST",
            url: url + "depth",
            dataType: "json",
            data: {
                currency: "USD",
                product: "250Call1031",
            }
        }).then(function (data) {
            //alert(+parseInt(data.bids).toFixed(0) + +parseInt(data.asks).toFixed(0));
        });
    },

    getExpirations:function () {
      return $http({
            method: "POST",
            url: url + "expire_times",
            dataType: "json",
            data: {
            }
        })
    },

    getLastTrades:function (callback) {
      return $http({
          method: "POST",
          url: url + "order_executions",
          dataType: "json",
          data: {
            product: "XBT"
          }
      });
    }
};

AOapi.Misc = {

};

AOapi.User = {

    //*params LIST: 'first_name', 'last_name', 'dob', 'cell', 'addr_street', 'addr_city', 'addr_state', 'addr_zip'//
    register: function (data) {
      return $http({
          method: "POST",
          url: url + "delete_session",
          dataType: "json",
          data: {
            email: data.email,
            password: data.password,
            referrer: data.referrer,
            first_name: data.first_name,
            last_name: data.last_name,
            dob: data.dob,
            cell: data.cell,
            addr_street: data.addr_street,
            addr_city: data.addr_city,
            addr_state: data.addr_state,
            addr_zip: data.addr_zip
          }
        });
      },

    logOut: function () {
    return $http({
          method: "POST",
          url: url + "delete_session",
          dataType: "json",
          data: {
            auth_token: localStorage.getItem('token')
          }
        });
    },


    login: function (callback, data) {
    return $http({
            method: "POST",
            url: "https://aos-v3.alt-options.com/login",
            dataType: "json",
            data: {
                email: data.email,
                password: data.password
            }
        }).then(function (data) {
            callback(data);
        });
    },

    resetPassword: function (data) {
    return $http({
            method: "POST",
            url: urlAuthed + "change_password",
            dataType: "json",
            data: {
                auth_token: $window.localStorage.getItem('token'),
                password: data.opword,
                new_password: data.npword
            }
        });
    },


    getTotalFees:function(){
     return $http({
            method: "POST",
            url: urlAuthed + "total_fees",
            dataType: "json",
            data: {
                auth_token: $window.localStorage.getItem('token'),
            }
        });
    },

    getUserPram:function(){
      return $http({
            method: "POST",
            url: urlAuthed + "params",
            dataType: "json",
            data: {
                auth_token: $window.localStorage.getItem('token'),
            }
        });
    },

    getUserMargin:function(){
      return $http({
            method: "POST",
            url: urlAuthed + "margin",
            dataType: "json",
            data: {
                auth_token: $window.localStorage.getItem('token'),
            }
        });
    },

    setExerciseStatus:function(status){
      return $http({
            method: "POST",
            url: urlAuthed + "set_auto_exercise_status",
            dataType: "json",
            data: {
                auth_token: $window.localStorage.getItem('token'),
                enabled: status
            }
        });
    },

    autoExerciseStatus:function(){
      return $http({
            method: "POST",
            url: urlAuthed + "auto_exercise_status",
            dataType: "json",
            data: {
                auth_token: $window.localStorage.getItem('token'),
            }
        });
    },

    submitBank:function(data){
      return $http({
            method: "POST",
            url: urlAuthed + "submit_bank",
            dataType: "json",
            data: {
                auth_token: $window.localStorage.getItem('token'),
                routing: data.routing,
                type: data.typ,
                acc_num: data.acc_num,
                device_id: data.device_id
            }
        });
    },

    verifyMicroDep:function(amount){
      return $http({
            method: "POST",
            url: urlAuthed + "verify_micro_dep",
            dataType: "json",
            data: {
                auth_token: $window.localStorage.getItem('token'),
                amount: amount
            }
        });
    },

    withdrawUSD:function(data){
      return $http({
            method: "POST",
            url: urlAuthed + "withdraw_usd",
            dataType: "json",
            data: {
                auth_token: $window.localStorage.getItem('token'),
                amount: data.amount,
                device_id: data.device_id
            }
        });
    },

    depositUSD:function(data){
      return $http({
            method: "POST",
            url: urlAuthed + "deposit_usd",
            dataType: "json",
            data: {
                auth_token: $window.localStorage.getItem('token'),
                amount: data.amount,
                device_id: data.device_id
            }
        });
    },

    depositXBT:function(){
      return $http({
            method: "POST",
            url: urlAuthed + "deposit_xbt",
            dataType: "json",
            data: {
                auth_token: $window.localStorage.getItem('token'),
            }
        });
    },

    withdrawXBT:function(data){
      return $http({
            method: "POST",
            url: urlAuthed + "withdraw_xbt",
            dataType: "json",
            data: {
                auth_token: $window.localStorage.getItem('token'),
                addr: data.addr,
                amount: data.amount
            }
        });
    },

    set_referral_code:function(newCode){
      return $http({
            method: "POST",
            url: urlAuthed + "set_referral_code",
            dataType: "json",
            data: {
                auth_token: $window.localStorage.getItem('token'),
                new_code: newCode
            }
        });
    },




    //*params LIST: 'first_name', 'last_name', 'dob', 'cell', 'addr_street', 'addr_city', 'addr_state', 'addr_zip'//

    changeUserPram:function(data){
      return  $http({
            method: "POST",
            url: urlAuthed + "update_params",
            dataType: "json",
            data: {
                auth_token: $window.localStorage.getItem('token'),
                first_name: data.first_name,
                last_name: data.last_name,
                dob: data.dob,
                cell: data.cell,
                addr_street: data.addr_street,
                addr_city: data.addr_city,
                addr_state: data.addr_state,
                addr_zip: data.addr_zip,
            }
        })
    },

    get2FAStatus:function(){
      return   $http({
            method: "POST",
            url: urlAuthed + "tfa_status",
            dataType: "json",
            data: {
                auth_token: $window.localStorage.getItem('token'),
            }
        });
    },

    enable2FA:function(callback){
      return  $http({
            method: "POST",
            url: urlAuthed + "set_tfa_status",
            dataType: "json",
            data: {
                auth_token: $window.localStorage.getItem('token'),
                enabled: true,
            }
        })
    },

    disable2FA:function(callback){
      return  $http({
            method: "POST",
            url: urlAuthed + "set_tfa_status",
            dataType: "json",
            data: {
                auth_token: $window.localStorage.getItem('token'),
                enabled: false,
            }
        });
    },

};


return AOapi;

}]);
