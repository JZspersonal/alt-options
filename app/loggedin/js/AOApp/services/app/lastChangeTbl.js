angular.module("myApp.services").factory('lastChange', function(){

  var lastChange = function(date, positionList) {
    this.table = [],

    this.initialize = function(date, positionList){
      for (var i = 0; i < positionList.products.length; i++){
        this.table.push({
          position: positionList.products[i],
          consoleChange: date,
          orderChange: date
        });
      };
    };

    this.initialize(date, positionList);

    this.update = function(position, time, inputPlace) {
      var name = position.name;
      var table = this.table;
      for (var i = 0; i < table.length; i++) {
        if(name == table[i].position.name) {
          if (inputPlace == "console"){
            table[i].consoleChange = time;
          } else {
            table[i].orderChange = time;
          }
          break;
        };
      };
      this.table = table;
    };

    this.renew = function(positionList){
      var table = this.table;
      for (var i = 0; i < positionList.products.length; i++){
        table[i].position = positionList.products[i];
      };
      this.table = table;
    };
  }

  return lastChange;

});
