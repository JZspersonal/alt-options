angular.module('myApp.services').factory("position", ['$window', function($window){
  var position = function(symbol, bid, ask, amount, spot) {
    if (symbol.indexOf("Call") > 0) {
      this.type = "call";
      this.strike = Number(symbol.substring(0, symbol.length - 10));
    } else if (symbol.indexOf("Put") > 0) {
      this.type = "put";
      this.strike = Number(symbol.substring(0, symbol.length - 9));
    } else {
      this.type = "XBT";
    }
    this.name = symbol,
    this.bid = bid,
    this.ask = ask,
    this.expiration = String(symbol.substring(symbol.length - 6, symbol.length)),
    this.amount = Number(amount).toFixed(2),
    this.underlying = spot
  };
  return position;
}]);


angular.module('myApp.services').factory('positionList', ['position', 'greekTable', 'blackScholes', function(position, greekTable, blackScholes){
  var positionList = function(){
    //this.volatility = volatility * Math.sqrt(252),
    this.volatility = 1;

    this.products = [],

    this.totalAmount = 0,

    this.greekArr = [],

    this.addPosition = function(position) {
      //this.products.push(position);
      if (this.products.length == 0) {
        // if (position.type != "XBT") {
          this.addGreekPosition(position.name, position.underlying, position.strike, getTerm(position.expiration), this.volatility, 0.11, position.type, position.amount);
        //}
        this.products.push(position);
        this.totalAmount = Number(this.totalAmount) + Number(position.amount);
      } else {
        var added = false;
        for (var i = 0; i < this.products.length; i++) {
          if (this.products[i].name == position.name && this.products[i].type == position.type) {
          //  ////console.log(this.totalAmount);
            this.totalAmount = Number(this.totalAmount) + Number(position.amount);
            this.products[i].amount = Number(this.products[i].amount) + Number(position.amount);
          //  ////console.log("number after add:"+this.totalAmount);
            added = true;
            if (this.products[i].amount == 0) {
              this.greekArr[i].premium = 0;
              this.greekArr[i].delta = 0;
              this.greekArr[i].theta = 0;
              this.greekArr[i].vega = 0;
              this.greekArr[i].rho = 0;
              this.greekArr[i].gamma = 0;
            } else {
              // if (position.type != "XBT") {
                this.addGreekPosition(position.name, position.underlying, position.strike, getTerm(position.expiration), this.volatility, 0.11, position.type, position.amount);
              //}
          };
            break;
          }
        };
        if (added != true) {
          this.products.push(position);
          // if (position.type != "XBT") {
            this.addGreekPosition(position.name, position.underlying, position.strike, getTerm(position.expiration), this.volatility, 0.11, position.type, position.amount);
        //  }
          this.totalAmount = Number(this.totalAmount) + Number(position.amount);
        }
      }
    },

    this.removePosition = function(position) {
        var wasntThere = true;
        for (var i = 0; i < this.products.length; i++) {
          ////console.log(this.totalAmount)
          if (this.products[i].name == position.name && this.products[i].type == position.type) {
            wasntThere = false;
            this.products[i].amount = Number(this.products[i].amount) - Number(position.amount);
            this.totalAmount = Number(this.totalAmount) - Number(position.amount);
            // if (Number(this.products[i].amount) == 0){
            //   this.products.splice(i, 1);
            // }
            if (this.products[i].amount == 0) {
              this.greekArr[i].premium = 0;
              this.greekArr[i].delta = 0;
              this.greekArr[i].theta = 0;
              this.greekArr[i].vega = 0;
              this.greekArr[i].rho = 0;
              this.greekArr[i].gamma = 0;
            } else {
            ////console.log("removing position");
          //  if (position.type != "XBT") {
              this.removeGreekPosition(position.name, position.underlying, position.strike, getTerm(position.expiration), this.volatility, 0.11, position.type, position.amount);
            //}
          };
          break;
        }

        }

        if (wasntThere == true) {
          var newPos = position;
          var newAmount = 0 - position.amount;
          newPos.amount = newAmount;
          this.addPosition(newPos);
        };
    }

    this.clear = function() {
      this.greekArr = [];
      this.totalAmount = 0;
      this.products = [];
    },

    this.deletePosition = function(position) {
      //console.log(position);
      //console.log(position.amount);

      // this.totalAmount = Number(this.totalAmount) - Number(position.amount);
      //console.log(this.totalAmount);
      for (var i = 0; i < this.products.length; i++) {

        if (this.products[i].name == position.name && this.products[i].type == position.type) {
          this.products.splice(i, 1);
          ////console.log("deleting position");
          // if (position.type != "XBT") {
            this.deleteGreekPosition(position.name, position.underlying, position.strike, getTerm(position.expiration), this.volatility, 0.11, position.type, position.amount);
        //  }
        } else {
          // alert("position not found");
        }
      };
    },

    this.deleteGreekPosition = function(name, s, k, t, v, r, callPut, amount) {
      for (var i = 0; i < this.greekArr.length; i++) {
        if (this.greekArr[i].name == name) {
          this.greekArr.splice(i, 1);
        }
      };
    },

    this.removeGreekPosition = function(name, s, k, t, v, r, callPut, amount) {
      var type = callPut;
      for (var i = 0; i < this.greekArr.length; i++) {
          if (this.greekArr[i].name == name) {

            if (type == "XBT") {
              this.greekArr[i].delta = this.greekArr[i].delta - amount;
              break;
            } else {

            ////console.log(blackScholes.priceBS(s, k, t, v, r, callPut) * amount);
            this.greekArr[i].premium = this.greekArr[i].premium - blackScholes.priceBS(s, k, t, v, r, callPut) * amount;
            this.greekArr[i].delta = this.greekArr[i].delta - greekTable.delta(s, k, t, v, r, callPut) * amount;
            this.greekArr[i].theta = this.greekArr[i].theta - greekTable.theta(s, k, t, v, r, callPut) * amount;
            this.greekArr[i].vega = this.greekArr[i].vega - greekTable.vega(s, k, t, v, r) * amount;
            this.greekArr[i].rho = this.greekArr[i].rho - greekTable.rho(s, k, t, v, r) * amount;
            this.greekArr[i].gamma = this.greekArr[i].gamma - greekTable.gamma(s, k, t, v, r) * amount;
            break;
          }
        }
      };
    },

    this.addGreekPosition = function(name, s, k, t, v, r, callPut, amount) {
      var type = callPut;
    //  console.log(amount);
      if (this.greekArr.length == 0) {
        if (type == "XBT") {
          this.greekArr.push(
          {
            name: name,
            premium: 0,
            delta: 1 * amount,
            theta: 0,
            vega: 0,
            rho: 0,
            gamma: 0
          }
        );
        } else {
          this.greekArr.push(
          {
            name: name,
            premium: blackScholes.priceBS(s, k, t, v, r, callPut) * amount,
            delta: greekTable.delta(s, k, t, v, r, callPut) * amount,
            theta: greekTable.theta(s, k, t, v, r, callPut) * amount,
            vega: greekTable.vega(s, k, t, v, r) * amount,
            rho: greekTable.rho(s, k, t, v, r) * amount,
            gamma: greekTable.gamma(s, k, t, v, r) * amount
          }
        );
        }

      } else {
        var addedGreek = false;
        for (var i = 0; i<this.greekArr.length; i++) {
          if (this.greekArr[i].name == name) {
            if (type == "XBT") {
              this.greekArr[i].delta = this.greekArr[i].delta  + amount;
              break;
            } else {
              //////console.log(blackScholes.priceBS(s, k, t, v, r, callPut) * amount);
              this.greekArr[i].premium = this.greekArr[i].premium + blackScholes.priceBS(s, k, t, v, r, callPut) * amount;
              this.greekArr[i].delta = this.greekArr[i].delta + greekTable.delta(s, k, t, v, r, callPut) * amount;
              this.greekArr[i].theta = this.greekArr[i].theta + greekTable.theta(s, k, t, v, r, callPut) * amount;
              this.greekArr[i].vega = this.greekArr[i].vega + greekTable.vega(s, k, t, v, r) * amount;
              this.greekArr[i].rho = this.greekArr[i].rho + greekTable.rho(s, k, t, v, r) * amount;
              this.greekArr[i].gamma = this.greekArr[i].gamma + greekTable.gamma(s, k, t, v, r) * amount;
              addedGreek = true;
              break;
            }
          }
        };
        if (addedGreek != true) {
          if (type == "XBT") {
            this.greekArr.push(
            {
              name: name,
              premium: 0,
              delta: 1 * amount,
              theta: 0,
              vega: 0,
              rho: 0,
              gamma: 0
            }
          );
          } else {
            this.greekArr.push(
            {
              name: name,
              premium: blackScholes.priceBS(s, k, t, v, r, callPut) * amount,
              delta: greekTable.delta(s, k, t, v, r, callPut) * amount,
              theta: greekTable.theta(s, k, t, v, r, callPut) * amount,
              vega: greekTable.vega(s, k, t, v, r) * amount,
              rho: greekTable.rho(s, k, t, v, r) * amount,
              gamma: greekTable.gamma(s, k, t, v, r) * amount
            }
          );
          }
        }
      };
    };

  };

return positionList;

}]);
