'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);


/*Directives for Options Table Tbody*/
angular.module('myApp.directives').
  directive('tradeHistory', ['$timeout', function($timeout) {

// the commented out section is for angular implementation


  /*  return {
      restrict: "E",
      scope: {
        data: "="
      },
      templateUrl:"js/AOApp/directivesTemplates/tradeHistory.html"
    }*/

//React implemntation
    return {
      restrict: "E",
      scope: {
        data: "="
      },

      link: function(scope, el, attrs){
        $timeout(function(){
          scope.$watch('data', function(newValue, oldValue){
            ReactDOM.render(React.createElement(TradeHistory, {data: newValue}),
                        el[0]
                    );
          });
        }, 600)

      }
    }
}]);

// directives to open orders and positions
angular.module('myApp.directives').
  directive('optionTable2', function() {
    return {
      restrict: "E",
      scope: {
        data: "=",
        exp: "=",
        updateFn: '&',
        updateFn2: '&',
        updateFn3: '&'
      },
      templateUrl:"js/AOApp/directivesTemplates/optionTable2.html"
    }
});


//options table in analytics view//
angular.module('myApp.directives').
  directive('orderTable', function() {
    return {
      restrict: "E",
      scope: {
        data: "=",
        updateFn: '&',
        updateFn2: '&',
        updateFn3: '&'
      },
      templateUrl:"js/AOApp/directivesTemplates/orderTable.html"
    }

});

angular.module('myApp.directives').
// the commented out section is for angular implementation

  //directive('orderBook', function() {
    /*return {
      restrict: "E",
      scope: {
        asks: "=",
        bids: "=",
        updateFn: '&'
      },
      templateUrl:"js/AOApp/directivesTemplates/orderBook.html",
      replace: true,
      link: function(scope, elm, attrs) {
        // scope.callUpdate = function() {
        //   scope.updateFn()("Directive Args");
        // }
      }
    }*/

//React implemntation
    directive('orderBook', ['$timeout', function($timeout){

      return {
        restrict: "E",
        scope: {
          data: "="
        },
        link: function(scope, el, attrs){
          $timeout(function(){
            scope.$watch('data', function(newValue, oldValue){
            ReactDOM.render(React.createElement(OrderBook, {data: scope.data, scope: scope}),
                        el[0]
                    );
                  });

          }, 600)
                }
              }
            }]);

angular.module('myApp.directives').
  directive('greekTable', function() {
    return {
      restrict: "E",
      scope: {
        data: "=",
        updateFn: '&'
      },
      templateUrl:"js/AOApp/directivesTemplates/greekTable.html",
      replace: true,
      link: function(scope, elm, attrs) {
    }
  }
});

// directive for standsit movement table on analytics
angular.module('myApp.directives').
  directive('movementTable', function() {
    return {
      restrict: "E",
      scope: {
        data: "="
      },
      templateUrl:"js/AOApp/directivesTemplates/movementTable.html"
    }
});

angular.module('myApp.directives').
  directive('greekTable2', function() {
    return {
      restrict: "E",
      scope: {
        data: "=",
        updateFn: '&'
      },
      templateUrl:"js/AOApp/directivesTemplates/greekTable2.html",
      replace: true,
      link: function(scope, elm, attrs) {
    }
  }
});

angular.module('myApp.directives')
.directive('optionTable', function() {
    return {
        restrict: 'E',
        scope: {
          data: "=",
          exp: "=",
          updateFn: '&',
          updateFn2: '&'
        },
        // object is passed while making the call
        templateUrl: "js/AOApp/directivesTemplates/optionTable.html",
        replace: true,
        link: function(scope, elm, attrs) {
          // scope.callUpdate = function() {
          //   scope.updateFn()("Directive Args");
          // }
        }
    }
});

angular.module('myApp.directives')
.directive('highlighter', ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$watch(attrs.highlighter, function (nv, ov) {
                if (nv !== ov) {
                    var newclass = Number(nv) <= (ov) ? 'highlight-red' : 'highlight-green';
                    // apply class
                    element.addClass(newclass);

                    // auto remove after some delay
                    $timeout(function () {
                        element.removeClass(newclass);
                    }, 1500);
                }
            });
        }
    };
}]);


angular.module('myApp.directives').
  directive('analyzeTable', function() {
    return {
      restrict: "E",
      scope: {
        alpha: "="
      },
      templateUrl:"js/directivesTemplates/positionsTable.html"
    }
});


angular.module('myApp.directives').
  directive('createParticles', function() {
    return {
      restrict: "E",
      templateUrl:"js/directivesTemplates/createParticles.html"
    }
});

// TV Chart Directive//
angular.module('myApp.directives').
  directive('tvChart', function() {
    return {
      restrict: "EA",
      replace: true,
      scope: {
        ticker: "="
      },
      templateUrl:"js/directivesTemplates/positionsTable.html"
    }
});


angular.module('myApp.directives')
    .directive('loading', ['$http' ,function ($http)
    {
        return {
            restrict: 'A',
            link: function (scope, element, attrs)
            {
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (v)
                {
                    if(v){
                        // alert("loaded!");
                        // element.show();
                    }else{
                        // element.hide();
                    }
                });
            }
        };

    }]);


angular.module('myApp.directives')
    .directive('showTab', function () {
            return {
                link: function (scope, element, attrs) {
                    element.click(function(e) {
                        e.preventDefault();
                        $(element).tab('show');
                    });
                }
            };
        });
