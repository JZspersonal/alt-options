var AOapi = AOapi || {};

AOapi = {};
AOapi.User = {};

AOapi.Trading = {

    getTrades: function (callback, data) {
        $.ajax({
            type: "POST",
            url: "https://aos-comp.alt-options.com/public/authed/order_executions",
            dataType: "json",
            data: JSON.stringify({
                auth_token: localStorage.getItem('token'),
                order:data.orderID,
            })
        }).done(function (data) {
            callback(data);
        });
    },

    getExecutions: function (callback) {
        $.ajax({
            type: "POST",
            url: "https://aos-comp.alt-options.com/public/authed/notifications",
            dataType: "json",
            data: JSON.stringify({
                auth_token: localStorage.getItem('token'),
                num: 1,
            })
        }).done(function (data) {
            callback(data);
        });
    },

    placeBid: function (callback, data) {
        $.ajax({
            type: "POST",
            url: "https://aos-comp.alt-options.com/public/authed/place_order",
            dataType: "json",
            data: JSON.stringify({
                auth_token: localStorage.getItem('token'),
                currency: "USD",
                product: data.ordProd,
                order_type: "Bid",
                price: data.ordPrice,
                amount: data.ordAmt
            })
        }).done(function (data) {
            callback(data);
        });
    },

    placeAsk: function (callback, data) {
        $.ajax({
            type: "POST",
            url: "https://aos-comp.alt-options.com/public/authed/place_order",
            dataType: "json",
            data: JSON.stringify({
                auth_token: localStorage.getItem('token'),
                currency: "USD",
                product: data.ordProd,
                order_type: "Ask",
                price: data.ordPrice,
                amount: data.ordAmt
            })
        }).done(function (data) {
            callback(data);
        });
    },

    exerciseOptions: function (callback, data) {
        $.ajax({
            type: "POST",
            url: "https://aos-comp.alt-options.com/public/authed/exercise_options",
            dataType: "json",
            data: JSON.stringify({
                auth_token: localStorage.getItem('token'),
                product: data.ordProd,
                amount: data.ordAmt,
            })
        }).done(function (data) {
            callback(data);
        });
    },

    cancelOrder: function (callback, data) {
        $.ajax({
            type: "POST",
            url: "https://aos-comp.alt-options.com/public/authed/cancel_order",
            dataType: "json",
            data: JSON.stringify({
                auth_token: localStorage.getItem('token'),
                id: data.orderID
            })
        }).done(function (data) {
            callback(data);
        });
    }
};

AOapi.Account = {
    getOpenOrders: function (callback) {
        $.ajax({
            type: "POST",
            url: "https://aos-comp.alt-options.com/public/authed/orders",
            dataType: "json",
            data: JSON.stringify({
                auth_token: localStorage.getItem('token'),
                status: "Open",
            })
        }).done(function (data) {
            callback(data);
        });
    },

    getClosedOrders: function (callback) {
        $.ajax({
            type: "POST",
            url: "https://aos-comp.alt-options.com/public/authed/orders",
            dataType: "json",
            data: JSON.stringify({
                auth_token: localStorage.getItem('token'),
                status: "Completed",
            })
        }).done(function (data) {
            callback(data);
        });
    },

    getRejectedOrders: function (callback) {
        $.ajax({
            type: "POST",
            url: "https://aos-comp.alt-options.com/public/authed/orders",
            dataType: "json",
            data: JSON.stringify({
                auth_token: localStorage.getItem('token'),
                status: "AutoCanceled",
            })
        }).done(function (data) {
            callback(data);
        });
    },

    getBalances: function (callback) {
        $.ajax({
            type: "POST",
            url: "https://aos-comp.alt-options.com/public/authed/balances",
            dataType: "json",
            data: JSON.stringify({
                auth_token: localStorage.getItem('token')
            })
        }).done(function (data) {
            callback(data);
        });
    },

    getPositions: function (callback) {
        $.ajax({
            type: "POST",
            url: "https://aos-comp.alt-options.com/public/authed/positions",
            dataType: "json",
            data: JSON.stringify({
                auth_token: localStorage.getItem('token')
            })

        }).done(function (data) {
            callback(data);
        });
    }
};

AOapi.Product = {
    getOrderBook: function (callback, data) {
        $.ajax({
            type: "POST",
            url: "https://aos-comp.alt-options.com/public/orderbook",
            dataType: "json",
            data: JSON.stringify({
                currency: "USD",
                product: data.ordProd,
                slots: 20,
            })
        }).done(function (data) {
            callback(data);
        });
    },

    getSymbols: function (callback) {
        $.ajax({
            type: "POST",
            url: "https://aos-comp.alt-options.com/public/symbols",
            dataType: "json",
            data: JSON.stringify({
                active_only: true
            })

        }).done(function (data) {
            callback(data);
        });
    },

    getOptions: function (callback, data) {
        $.ajax({
            type: "POST",
            url: "https://aos-comp.alt-options.com/public/options",
            dataType: "json",
            data: JSON.stringify({
                product: "XBT",
                expire_time: data.expTime
            })

        }).done(function (data) {
            callback(data);
        });
    },

    getDepth: function (callback) {
        $.ajax({
            type: "POST",
            url: "https://aos-comp.alt-options.com/public/depth",
            dataType: "json",
            data: JSON.stringify({
                currency: "USD",
                product: "280Call1130",
            })
        }).done(function (data) {
            //alert(+parseInt(data.bids).toFixed(0) + +parseInt(data.asks).toFixed(0));
        });
    },

    getExpirations:function (callback) {
        $.ajax({
            type: "POST",
            url: "https://aos-comp.alt-options.com/public/expire_times",
            dataType: "json",
            data: JSON.stringify({
            })
        }).done(function (data) {
            callback(data);
        });
    },

    getLastTrades:function (callback) {
      $.ajax({
          type: "POST",
          url: "https://aos-comp.alt-options.com/public/order_executions",
          dataType: "json",
          data: JSON.stringify({
            product: "XBT"
          })
      }).done(function (data) {
          callback(data);
      });
    }
};

AOapi.Misc = {};

AOapi.User = {
    login: function (callback, data) {
        $.ajax({
            type: "POST",
            url: "https://aos-comp.alt-options.com/login",
            dataType: "json",
            data: JSON.stringify({
                email: data.email,
                password: data.password
            })
        }).done(function (data) {
            callback(data);
        });
    },

    resetPassword: function (callback, data) {
        $.ajax({
            type: "POST",
            url: "https://aos-comp.alt-options.com/public/authed/change_password",
            dataType: "json",
            data: JSON.stringify({
                auth_token: localStorage.getItem('token'),
                password: data.opword,
                new_password: data.npword
            })
        }).done(function (data) {
            callback(data);
        });
    },


   getTotalFees:function(callback){
        $.ajax({
            type: "POST",
            url: "https://aos-comp.alt-options.com/public/authed/total_fees",
            dataType: "json",
            data: JSON.stringify({
                auth_token: localStorage.getItem('token'),
            })
        }).done(function (data) {
            callback(data);
        });
    },

    getUserPram:function(callback){
        $.ajax({
            type: "POST",
            url: "https://aos-comp.alt-options.com/public/authed/params",
            dataType: "json",
            data: JSON.stringify({
                auth_token: localStorage.getItem('token'),
            })
        }).done(function (data) {
            callback(data);
        });
    },

    getUserMargin:function(callback){
        $.ajax({
            type: "POST",
            url: "https://aos-comp.alt-options.com/public/authed/margin",
            dataType: "json",
            data: JSON.stringify({
                auth_token: localStorage.getItem('token'),
            })
        }).done(function (data) {
            callback(data);
        });
    },

    //*params LIST: 'first_name', 'last_name', 'dob', 'cell', 'addr_street', 'addr_city', 'addr_state', 'addr_zip'//

    changeUserPram:function(callback, data){
        $.ajax({
            type: "POST",
            url: "https://aos-comp.alt-options.com/public/authed/update_params",
            dataType: "json",
            data: JSON.stringify({
                auth_token: localStorage.getItem('token'),
                first_name: data.first_name,
                last_name: data.last_name,
                dob: data.dob,
                cell: data.cell,
                addr_street: data.addr_street,
                addr_city: data.addr_city,
                addr_state: data.addr_state,
                addr_zip: data.addr_zip,
            })
        }).done(function (data) {
            callback(data);
        });
    },

    get2FAStatus:function(callback){
        $.ajax({
            type: "POST",
            url: "https://aos-comp.alt-options.com/public/authed/tfa_status",
            dataType: "json",
            data: JSON.stringify({
                auth_token: localStorage.getItem('token'),

            })
        }).done(function (data) {
            callback(data);
        });
    },

    enable2FA:function(callback){
        $.ajax({
            type: "POST",
            url: "https://aos-comp.alt-options.com/public/authed/set_tfa_status",
            dataType: "json",
            data: JSON.stringify({
                auth_token: localStorage.getItem('token'),
                enabled: true,
            })
        }).done(function (data) {
            callback(data);
        });
    },

    disable2FA:function(callback){
        $.ajax({
            type: "POST",
            url: "https://aos-comp.alt-options.com/public/authed/set_tfa_status",
            dataType: "json",
            data: JSON.stringify({
                auth_token: localStorage.getItem('token'),
                enabled: false,
            })
        }).done(function (data) {
            callback(data);
        });
    },

};
